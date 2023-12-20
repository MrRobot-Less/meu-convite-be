import { NextFunction, Response } from "express";
import { QueryRequest } from "./type";
import { PlanService } from "../services/plan";

export default class PlanCtrl {
	constructor() {}

	async get(req: QueryRequest<{}, { id: string }>, res: Response, next: NextFunction) {
		PlanService.get(req.params.id, (err, plan) => {
			if (err) return next(err);
			res.status(200).json({ plan: plan });
		});	
	}
}