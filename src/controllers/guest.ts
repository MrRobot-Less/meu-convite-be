import { NextFunction, Response } from "express";
import { QueryRequest } from "./type";
import { GuestService } from "../services/guest";

export default class GuestCtrl {
	constructor() {}

	async delete(req: QueryRequest<{}, { id: string }>, res: Response, next: NextFunction) {
		GuestService.delete(req.params.id, (err) => {
			if (err) return next(err);
			res.status(200).json({ status: 'deleted' });
		});	
	}
}