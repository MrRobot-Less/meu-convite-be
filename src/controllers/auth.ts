import { NextFunction, Response } from 'express';
import { BodyRequest, QueryRequest } from './type';
import { authenticateUserDTO, registerUserDTO } from '../dtos/auth';
import { AuthService } from '../services/auth';

export default class AuthCtrl {
	constructor() {}
	async register(req: BodyRequest<registerUserDTO>, res: Response, next: NextFunction) {
		AuthService.register(req.body, (err, user) => {
			if (err) return next(err);
			res.status(200).send({
				status: 'ok',
				user: user
			});
		});
	}

	async authenticate(req: BodyRequest<authenticateUserDTO>, res: Response, next: NextFunction) {
		AuthService.authenticate(req.body, (err, user) => {
			if (err) return next(err);
			res.status(200).send({
				status: 'ok',
				user: user
			});
		});
	}
}
