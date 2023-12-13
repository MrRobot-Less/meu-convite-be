import { Response } from "express";
import { QueryRequest } from "./type";
import { webhookUpdateDTO } from "../dtos/webhook";
import { payment } from "../config/mercadopago";

export default class Webhook {
	constructor() {}

	async update(req: QueryRequest<webhookUpdateDTO>, res: Response) {
		const { type } = req.query;
		const id = req.query['data.id'];
		if (type === 'payment') {
			return payment.get({
				id: id
			})
				.then(result => {
					if (result.status === 'approved') {
					}
					res.status(200).json({ status: 'updated' });
				})
				.catch(e => {
					res.status(400).json({ error: e.message })
				})
			// create a subcription
		}
		res.status(200).json({ status: 'updated' });
	}
}