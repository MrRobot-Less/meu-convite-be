import { Response } from "express";
import { QueryRequest } from "./type";
import { webhookUpdateDTO } from "../dtos/webhook";

export default class Webhook {
	constructor() {}

	async update(req: QueryRequest<webhookUpdateDTO>, res: Response) {
		const { type } = req.query;
		if (type === 'payment') {
			const id = req.query['data.id'];
			if (!id) res.status(400).json({ error: "missing the required field 'data.id'" });
			console.log(id);
			// create a subcription
		}
		res.status(200).json({ status: 'updated' });
	}
}