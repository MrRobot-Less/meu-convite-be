import { Response } from "express";
import { getEventDTO } from "../dtos/event";
import { QueryRequest } from "./type";

export default class Event {
	constructor() {}

	async index(req: QueryRequest<getEventDTO>, res: Response) {
		res.status(200).json({ userId: req.userId });
	}
}