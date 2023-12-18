import { NextFunction, Response } from "express";
import { QueryRequest } from "./type";
import { PlanService } from "../services/plan";

export default class PlanCtrl {
	constructor() {}

	async id(req: QueryRequest<{}, { id: string }>, res: Response, next: NextFunction) {
		const { id } = req.params;
		PlanService.get(id, (err, plan) => {
			if (err) return next(err);
			res.status(200).json({ plan: plan });
		});	
	}
}