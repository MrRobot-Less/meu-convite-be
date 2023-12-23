import { NextFunction, Request, Response } from "express"
import { SubscriptionService } from "../services/subscription"
import { AppError } from "../dtos/error";
import moment from 'moment';

export default function subscriptionMiddleware(req: Request, res: Response, next: NextFunction) {
	SubscriptionService.mySubscription(req.userId, (err, subscription) => {
		if (err) return next(err);
		if (!subscription || !subscription.active) return next(new AppError('Autherization not provided.'));
		var expiresAt = moment(subscription.expiresAt).subtract(1, 'month');
		var now = moment();
		if (now.isAfter(expiresAt)) return next(new AppError('Your subscription was expired. Please, subscribe again.'));
		req.subscriptionId = subscription._id.toString();
		next();
	});
}