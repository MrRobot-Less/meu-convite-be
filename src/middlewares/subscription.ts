import { NextFunction, Request, Response } from "express"
import { SubscriptionService } from "../services/subscription"
import { AppError } from "../dtos/error";

export default function subscriptionMiddleware(req: Request, res: Response, next: NextFunction) {
	SubscriptionService.mySubscription(req.userId, (err, subscription) => {
		if (err) return next(err);
		if (!subscription || !subscription.active) return next(new AppError('Autherization not provided.'))
		req.subscriptionId = subscription._id.toString();
		next();
	});
}