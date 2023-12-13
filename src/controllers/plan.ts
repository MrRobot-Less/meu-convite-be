import { Response } from "express";
import { QueryRequest } from "./type";
import Plan from "../models/plan";
import { isValidObjectId } from "mongoose";

export default class PlanCtrl {
	constructor() {}

	async id(req: QueryRequest<{}, { id: string }>, res: Response) {
		const { id } = req.params;
		if (!isValidObjectId(id)) return res.status(400).json({ error: 'provide a valid id' });

		const plan = await Plan.findById(id);
		if (!plan) return res.status(400).json({ error: 'plan not found' });
		res.status(200).json({ plan: plan });
	}
}