import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserDTO } from '../models/user';
import { BodyRequest } from './type';
import { authenticateUserDTO, registerUserDTO } from '../dtos/auth';
import { AppError } from '../dtos/error';

const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth.json');

function generateToken(params: any) {
	const token = jwt.sign(params, authConfig.secret, {
		expiresIn: 60 * 60 * 24 * 14 // two weeks
	});
	return token;
}

export default class AuthCtrl {
	constructor() {}
	async register(req: BodyRequest<registerUserDTO>, res: Response, next: NextFunction) {
		
		const newUser : Omit<UserDTO, 'createdAt' | '_id'> = {
			email: req.body.email,
			name: req.body.name,
			password: req.body.password
		};

		if (await User.findOne({ email: newUser.email })) return next(new AppError('User already registered.'));

		const user = await User.create(newUser);

		res.status(200).send({
			status: 'ok',
			token: generateToken({ id: user.id })
		});
	}

	async authenticate(req: BodyRequest<authenticateUserDTO>, res: Response, next: NextFunction) {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email }).select('+password');
		if (!user) return next(new AppError('User not found'));
		if (!await bcrypt.compare(password, user.password)) return next(new AppError('email or password incorrect.'));

		res.status(200).send({
			status: 'ok',
			token: generateToken({ id: user.id })
		});
	}
}
