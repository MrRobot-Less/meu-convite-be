import { Response } from "express";
import { QueryRequest } from "./type";
import * as _Plan from "../models/plan";
import { isValidObjectId } from "mongoose";

const PlanModel = _Plan.default;

export default class Plan {
	constructor() {}

	async id(req: QueryRequest<{}, { id: string }>, res: Response) {
		const { id } = req.params;
		if (!isValidObjectId(id)) return res.status(400).json({ error: 'provide a valid id' });

		const plan = await PlanModel.findById(id);
		if (!plan) return res.status(400).json({ error: 'plan not found' });
		res.status(200).json({ plan: plan });
	}
}