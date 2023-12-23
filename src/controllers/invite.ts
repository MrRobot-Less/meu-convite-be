import { NextFunction, Response } from "express";
import { BodyRequest, QueryRequest } from "./type";
import { InviteService } from "../services/invite";
import { setAnInviteDTO } from "../dtos/invite";

export default class InviteCtrl {
	constructor() {}

	get(req: QueryRequest<{}, { id: string }>, res: Response, next: NextFunction) {
		InviteService.get(req.params.id, (err, invite) => {
			if (err) return next(err);
			res.status(200).json({ invite: invite });
		});	
	}

	delete(req: QueryRequest<{}, { id: string }>, res: Response, next: NextFunction) {
		const { id } = req.params;
		InviteService.delete(id, (err) => {
			if (err) return next(err);
			res.json({ status: 'deleted' });
		});
		
	}

	set(req: BodyRequest<setAnInviteDTO, { id: string }>, res: Response, next: NextFunction) {
		InviteService.set(req.params.id, req.body, (err, invite) => {
			if (err) return next(err);
			res.status(200).json({ status: 'updated', invite: invite });
		});	
	}
}