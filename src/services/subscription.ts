import { isValidObjectId } from "mongoose";
import { payment } from "../config/mercadopago";
import { AppError } from "../dtos/error";
import Subscription, { SubscriptionDTO } from "../models/subscription";
import User from "../models/user";
import Plan, { PlanDTO } from "../models/plan";
import { PaymentService } from "./payment";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

import moment from "moment";

export const SubscriptionService = {
	create: async function(userId: string, planId: string, token: string | undefined, paymentMethodId: string, cb: (error: AppError | null, data?: PaymentResponse) => void) {
		const user = await User.findById(userId);
		const plan = await Plan.findById(planId);
		
		if (!user) return cb(new AppError('User not authenticated. Please, try to log in again.'));
		if (!plan) return cb(new AppError(`Plan ${planId} not found.`));

		if (!(await PaymentService.customerExists(user.email))) {
			await PaymentService.createCustomer({
				email: user.email,
				first_name: user.name
			});
		}

		Subscription.create({
			planId: plan.id,
			userId: userId,
			active: false,
			expiresAt: moment().add(plan.duration, 'month').endOf('day')
		}).then(subscription => {
			payment.create({
				body: {
					notification_url: PaymentService.getFullUrl('/v1/webhook/payment/plan/update'),
					payer : {
						email: user.email
					},
					transaction_amount: plan.price,
					description: plan.name,
					payment_method_id: paymentMethodId,
					token: token,
					external_reference: subscription.id
				}
			}).then((data) => {
				if (!data.id) return cb(new AppError('The id does not exists.'));
				cb(null, data);
			}).catch(cb)	
		})
		.catch(cb);
	},
	mySubscription: function(userId: string, cb: (err: AppError | null, subscription?: SubscriptionDTO) => void) {
		Subscription.findOne({ userId: userId, active: true }, null, { sort: { createdAt: -1 } })
			.populate('plan')
			.then(subscription => {
				if (!subscription) throw new AppError('This user does not have any active subscription.');
				cb(null, {
					...subscription.toObject(),
					plan: ((subscription as any).plan as any) as PlanDTO
				});
			})
			.catch(cb)
	},
	updateSubscriptionAfterPayment: function(paymentId: string, cb: (err: AppError | null) => void){
		payment.get({ id: paymentId })
			.then(async result => {
				if (result.status === 'approved') {
					const { external_reference } = result;
					if (!isValidObjectId(external_reference)) return cb(new AppError('The external_reference does not match.'));
					return Subscription.updateOne({ _id: external_reference }, { $set: { active: true, transactionId: paymentId } })
						.then(() => cb(null))
						.catch(cb);		
				}
				cb(null);
			})
			.catch(cb)
	}
}