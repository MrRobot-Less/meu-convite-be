import { Response, Request } from "express";
import { customerClient, paymentMethod, preference } from "../config/mercadopago";
import User from "../models/user";
import { BodyRequest } from "./type";
import { paymentFromAnItemDTO } from "../dtos/payment";
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

const getFullUrl = (req: BodyRequest<paymentFromAnItemDTO>, endpoint: string) =>{
    var url;
	if (process.env.NODE_ENV === 'production') { 
		url = req.protocol + '://' + req.get('host');
	} else {
		url = process.env.API_SERVER;
	}
    return url + endpoint;
}

export default class Payment {
	constructor() {}

	async checkout(req: BodyRequest<paymentFromAnItemDTO>, res: Response){
		const { itemId, model, payment_method_id } = req.body;
		
		if (model !== 'Plan') return res.status(400).json({ error: 'Model not exist.' });

		const user = await User.findById(req.userId);
		const item = await Plan.findById(itemId);
		
		if (!user) return res.status(400).json({ error: 'User not authenticated. Please, try to log in again.' });
		if (!item) return res.status(400).json({ error: `${model} ${itemId} not found.` });

		paymentMethod.get()
			.then(async methods => {
				var methodFound = methods.find(method => method.id === payment_method_id);
				if (!methodFound) return res.status(400).json({ error: 'Payment method is not valid.' });

				if (!(await customerExists(user.email))) {
					console.log('[+] Creating new customer...')
					await createCustomer({
						email: user.email,
						first_name: user.name
					});
				}

				preference.create({
					body: {
						notification_url: getFullUrl(req, '/webhook/payment/update'),
						items: [
							{
								id: itemId,
								quantity: 1,
								unit_price: item.price,
								title: item.name,
							}
						],
						payer : {
							email: user.email
						},
					}
				}).then((data) => {
					res.status(200).json({ redirect_to: data.init_point });
				}).catch(e => {
					res.status(400).json({ error: e.message });
				})
			})
			.catch(error => {
				res.status(400).json({ error: error.message });
			});

    }
}