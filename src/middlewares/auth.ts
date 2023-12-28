import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import { JwtPayload } from "../dtos/auth";
import { AppError } from "../dtos/error";
import { AuthService } from "../services/auth";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;

	if (!authHeader) return next(new AppError('Autherization not provided.'));

	const parts = authHeader.split(' ');
	if (!(parts.length === 2)) return next(new AppError('Token error.', 401));

	const [ schema, token ] = parts;
	if (!/^Bearer$/i.test(schema)) return next(new AppError('Token bad formated.', 401));

	const callback : jwt.VerifyCallback<string | jwt.JwtPayload | JwtPayload> = (err, decoded) => {
		if (err) return next(new AppError('Token invalid', 401));
		req.userId = (decoded as JwtPayload).id;
		return next();
	}

	AuthService.validate(token, callback);
}