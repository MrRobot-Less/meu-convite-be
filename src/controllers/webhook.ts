import { NextFunction, Response } from "express";
import { QueryRequest } from "./type";
import { webhookUpdateDTO } from "../dtos/webhook";
import { payment } from "../config/mercadopago";
import Subscription from "../models/subscription";
import { ObjectId, isValidObjectId } from "mongoose";
import mongoose from "../database";
import { AppError } from "../dtos/error";

export default class WebhookCtrl {
	constructor() {}

	async update(req: QueryRequest<webhookUpdateDTO>, res: Response, next: NextFunction) {
		const { type } = req.query;
		const id = req.query['data.id'];
		if (type === 'payment') {
			return payment.get({ id: id })
				.then(async result => {
					if (result.status === 'approved') {
						const { external_reference } = result;
						if (!isValidObjectId(external_reference)) return next(new AppError('external_reference does not match.'));
						return Subscription.updateOne({ _id: external_reference }, { $set: { active: true, transactionId: id } })
							.then(() => res.status(200).json({ status: result.status }))
							.catch(error => next(error));
							
					}
					res.status(200).json({ status: result.status });
				})
				.catch(error => next(error))
		}
		next(new AppError(`event ${type} not identificated.`));
	}
}