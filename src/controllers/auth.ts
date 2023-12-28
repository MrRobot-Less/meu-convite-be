import { NextFunction, Response } from 'express';
import { BodyRequest, QueryRequest } from './type';
import { authenticateUserDTO, registerUserDTO } from '../dtos/auth';
import { AuthService } from '../services/auth';

export default class AuthCtrl {
	constructor() {}
	async register(req: BodyRequest<registerUserDTO>, res: Response, next: NextFunction) {
		AuthService.register(req.body, (err, token) => {
			if (err) return next(err);
			res.status(200).send({
				status: 'ok',
				token: token
			});
		});
	}

	async authenticate(req: BodyRequest<authenticateUserDTO>, res: Response, next: NextFunction) {
		AuthService.authenticate(req.body, (err, token) => {
			if (err) return next(err);
			res.status(200).send({
				status: 'ok',
				token: token
			});
		});
	}

	async validateToken(req: QueryRequest<{}, { token: string }>, res: Response, next: NextFunction) {
		const { token } = req.params;
		AuthService.validate(token, (err) => {
			if (err) return next(err);
			res.status(200).json({
				status: 'authenticated'
			});
		});
	}
}
