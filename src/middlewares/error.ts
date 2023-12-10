import { NextFunction, Request, Response } from "express";

export default function errorHandle(err: Error, req: Request, res: Response, next: NextFunction) {
	if (err) return res.status(500).json({ error: 'Internal error', reason: err.message });
	next();
}