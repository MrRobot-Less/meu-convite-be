import { NextFunction, Request, Response } from "express";
import { BodyRequest } from "./type";
import { createAnEventDTO } from "../dtos/event";
import { SubscriptionService } from "../services/subscription";
import { EventService } from "../services/event";
import { AppError } from "../dtos/error";

export default class EventCtrl {
	constructor() {}

	createAnEvent(req: BodyRequest<createAnEventDTO>, res: Response, next: NextFunction) {
		SubscriptionService.mySubscription(req.userId, (err, subscription) => {
			if (err || !subscription) return next(err);
			if (!subscription.active) return next(new AppError('the subscription is not activate.'));
			EventService.getAllBySubscription(subscription._id.toString(), (error, events) => {
				if (error || !events) return next(error);
				
				if (events.length > (subscription.plan?.limitEvents || 0)) return next(new AppError('the event limit has been reached.'));
				
				EventService.create({
					...req.body,
					subscriptionId: subscription._id.toString(),
					date: new Date(req.body.date)
				}, (err, event) => {
					if (err) return next(err);
					res.status(200).json(event);
				});
			});
		});
	}

	id(req: Request<{ id: string }>, res: Response, next: NextFunction) {
		EventService.get(req.params.id, (err, event) => {
			if (err || !event) return next(err);
			res.status(200).json(event)
		});
	}
}