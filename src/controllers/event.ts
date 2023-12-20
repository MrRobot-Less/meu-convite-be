import { NextFunction, Request, Response } from "express";
import { BodyRequest } from "./type";
import { createAnEventDTO } from "../dtos/event";
import { SubscriptionService } from "../services/subscription";
import { EventService } from "../services/event";
import { AppError } from "../dtos/error";
import { addAnInviteDTO } from "../dtos/invite";
import { InviteService } from "../services/invite";

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

	get(req: Request<{ id: string }>, res: Response, next: NextFunction) {
		EventService.get(req.params.id, (err, event) => {
			if (err || !event) return next(err);
			res.status(200).json(event)
		});
	}

	set(req: BodyRequest<createAnEventDTO, { id: string }>, res: Response, next: NextFunction) {
		SubscriptionService.mySubscription(req.userId, (err, subscription) => {
			if (err || !subscription) return next(err);
			
			const data = {
				...req.body,
				subscriptionId: subscription._id,
				date: new Date(req.body.date)
			};

			EventService.set(req.params.id, data, (err) => {
				if (err) return next(err);
				res.status(200).json({ status: 'updated' });
			});
		});
		
	}

	addInvite(req: BodyRequest<addAnInviteDTO, { id: string }>, res: Response, next: NextFunction) {
		const eventId = req.params.id;
		InviteService.create(eventId, req.body, (error, invite) => {
			if (error) return next(error);
			res.status(200).json(invite);
		});
	}
}