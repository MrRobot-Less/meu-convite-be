import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import { JwtPayload } from "../dtos/auth";

const authConfig = require('../config/auth.json');

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;

	if (!authHeader) return res.status(401).json({ error: 'Autherization not provided.' });

	const parts = authHeader.split(' ');
	if (!(parts.length === 2)) return res.status(401).json({ error: 'Token error.'});

	const [ schema, token ] = parts;
	if (!/^Bearer$/i.test(schema)) return res.status(401).json({ error: 'Token bad formated.' });

	const callback : jwt.VerifyCallback<string | jwt.JwtPayload | JwtPayload> | undefined = (err, decoded) => {
		if (err) return res.status(401).json({ error: 'Token invalid' });
		req.userId = (decoded as JwtPayload).id;
		return next();
	}

	jwt.verify(token, authConfig.secret, callback);
}