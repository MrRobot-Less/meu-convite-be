import { NextFunction, Request, Response } from "express";
import { SubscriptionService } from "../services/subscription";

export default class SubscriptionCtrl {
	constructor() {}

	async index(req: Request, res: Response, next: NextFunction) {
		SubscriptionService.mySubscription(req.userId, (err, subscription) => {
			if (err || !subscription) return next(err);
			res.json({
				active: subscription.active,
				createdAt: subscription.createdAt,
				planId: subscription.planId,
				userId: subscription.userId,
				expiresAt: subscription.expiresAt
			});
		});
	}
}