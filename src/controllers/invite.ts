import { NextFunction, Response } from "express";
import { QueryRequest } from "./type";
import { InviteService } from "../services/invite";
import { EventService } from "../services/event";
import { AppError } from "../dtos/error";

export default class InviteCtrl {
	constructor() {}

	async get(req: QueryRequest<{}, { id: string }>, res: Response, next: NextFunction) {
		InviteService.get(req.params.id, (err, invite) => {
			if (err) return next(err);
			res.status(200).json({ invite: invite });
		});	
	}

	async delete(req: QueryRequest<{}, { id: string }>, res: Response, next: NextFunction) {
		const { id } = req.params;
		InviteService.get(id, (err, invite) => {
			if (err || !invite) return next(err);
			EventService.get(invite.eventId, (err, event) => {
				if (err || !event) return next(err);
				if (event.subscriptionId.toString() != req.subscriptionId?.toString()) return next(new AppError('action not allowed.', 401));
				InviteService.delete(id, (err) => {
					if (err) return next(err);
					res.json({ status: 'deleted' });
				})
			});
		});	
	}
}