import { NextFunction, Response } from "express";
import { QueryRequest } from "./type";
import Plan from "../models/plan";
import { isValidObjectId } from "mongoose";
import { AppError } from "../dtos/error";

export default class PlanCtrl {
	constructor() {}

	async id(req: QueryRequest<{}, { id: string }>, res: Response, next: NextFunction) {
		const { id } = req.params;
		if (!isValidObjectId(id)) return next(new AppError('provide a valid id'));

		const plan = await Plan.findById(id);
		if (!plan) return next(new AppError('plan not found'));

		res.status(200).json({ plan: plan });
	}
}