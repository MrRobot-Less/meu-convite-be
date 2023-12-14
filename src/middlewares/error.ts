import { NextFunction, Request, Response } from "express";
import { AppError } from "../dtos/error";

export default function errorHandle(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
	var error: AppError;
	
	if (err) {
		if (err instanceof Error) error = new AppError(err.message, 500);
		else error = err;
		return res.status(error.status).json({ error: err.message });
	}
	next();
}