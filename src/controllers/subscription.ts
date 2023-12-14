import { NextFunction, Request, Response } from "express";
import Subscription from "../models/subscription";

export default class SubscriptionCtrl {
	constructor() {}

	async index(req: Request, res: Response, next: NextFunction) {
		Subscription.findOne({ userId: req.userId })
			.then((subscription) => {
				if (!subscription) return next('this user does not have any suscription')
				
				res.status(200).json({
					subscription: {
						active: subscription.active,
						planId: subscription.planId,
						createdAt: subscription.createdAt,
						transactionId: subscription.transactionId
					}
				});
			})
			.catch(e => next(e))
	}
}