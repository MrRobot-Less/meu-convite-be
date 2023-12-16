import { NextFunction, Request, Response } from "express";
import { BodyRequest } from "./type";
import { createAnEventDTO } from "../dtos/event";
import { SubscriptionService } from "../services/subscription";

export default class EventCtrl {
	constructor() {}

	async createAnEvent(req: BodyRequest<createAnEventDTO>, res: Response, next: NextFunction) {
		SubscriptionService.mySubscription(req.userId, (err, subscription) => {
			if (err || !subscription) return next(err);
			res.json(subscription);
		});
	}
}