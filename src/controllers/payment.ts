import { Response } from "express";
import { customerClient, payment } from "../config/mercadopago";
import User from "../models/user";
import { BodyRequest } from "./type";
import { paramsPlanPaymentDTO, paymentFromAnItemDTO } from "../dtos/payment";
import Plan from "../models/plan";
import { CustomerRequestBody } from "mercadopago/dist/clients/customer/commonTypes";

import * as dotenv from "dotenv";
dotenv.config({ path: process.env.PWD+'/.env' });

async function createCustomer(body : CustomerRequestBody) {
	try {
		return await customerClient.create({ body: body });
	} catch (e) {
		return
	}
}

async function customerExists(email: string) {
	try {
		const customer = await customerClient.search({ options: { email: email } });
		return !!customer;
	} catch (e) {
		return false
	}
}

const getFullUrl = (req: BodyRequest<paymentFromAnItemDTO, paramsPlanPaymentDTO>, endpoint: string) =>{
    var url;
	if (process.env.NODE_ENV === 'production') { 
		url = req.protocol + '://' + req.get('host');
	} else {
		url = process.env.API_SERVER;
	}
    return url + endpoint;
}

export default class PaymentCtrl {
	constructor() {}

	async planCheckout(req: BodyRequest<paymentFromAnItemDTO, paramsPlanPaymentDTO>, res: Response){
		const { planId, token } = req.body;
		const { payment_method_id } = req.params;

		const user = await User.findById(req.userId);
		const plan = await Plan.findById(planId);
		
		if (!user) return res.status(400).json({ error: 'User not authenticated. Please, try to log in again.' });
		if (!plan) return res.status(400).json({ error: `Plan ${planId} not found.` });

		if (!(await customerExists(user.email))) {
			await createCustomer({
				email: user.email,
				first_name: user.name
			});
		}

		payment.create({
			body: {
				notification_url: getFullUrl(req, '/webhook/payment/update'),
				payer : {
					email: user.email
				},
				transaction_amount: plan.price,
				description: plan.name,
				payment_method_id: payment_method_id,
				token: token
			}
		}).then((data) => {
			if (!data.id) return res.status(400).json({ error: 'id does not exists'});
			res.status(200).json({ redirect_to: data.point_of_interaction?.transaction_data?.qr_code_base64 });
		}).catch(e => {
			res.status(400).json({ error: e.message });
		})

    }
}