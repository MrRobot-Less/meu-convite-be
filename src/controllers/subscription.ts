import { Response } from "express";
import { QueryRequest } from "./type";
import { subscribeDTO } from "../dtos/subcription";

export default class SubscriptionCtrl {
	constructor() {}

	async subscribe(req: QueryRequest<subscribeDTO>, res: Response) {
		res.status(200).json({ userId: req.userId });
	}
}