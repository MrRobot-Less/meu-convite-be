import { NextFunction, Response } from "express";
import { QueryRequest } from "./type";
import { webhookUpdateDTO } from "../dtos/webhook";
import { AppError } from "../dtos/error";
import { SubscriptionService } from "../services/subscription";

export default class WebhookCtrl {
	constructor() {}

	async update(req: QueryRequest<webhookUpdateDTO>, res: Response, next: NextFunction) {
		const { type } = req.query;
		const id = req.query['data.id'];
		if (type === 'payment') {
			return SubscriptionService.updateSubscriptionAfterPayment(id, (err) => {
				if (err) return next(err);
				res.status(200).json({ status: 'ok' });
			})
		}
		next(new AppError(`event ${type} not identificated.`));
	}
}