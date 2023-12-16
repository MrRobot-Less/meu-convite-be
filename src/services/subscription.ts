import { AppError } from "../dtos/error";
import Subscription, { SubscriptionDTO } from "../models/subscription";

export const SubscriptionService = {
	mySubscription: function(userId: string, cb: (err: Error | null, subscription?: SubscriptionDTO) => void) {
		Subscription.findOne({ userId: userId, active: true })
			.then(subscription => {
				if (!subscription) throw new AppError('this user does not have any active subscription');
				cb(null, subscription?.toObject());
			})
			.catch(error => cb(error))
	}
}