import { Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserDTO } from '../models/user';
import { BodyRequest } from './type';
import { authenticateUserDTO, registerUserDTO } from '../dtos/auth';

const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth.json');

function generateToken(params: any) {
	const token = jwt.sign(params, authConfig.secret, {
		expiresIn: 60 * 60 * 24 * 14 // two weeks
	});
	return token;
}

export default class Auth {
	constructor() {}
	async register(req: BodyRequest<registerUserDTO>, res: Response) {
		
		const newUser : Omit<UserDTO, 'createdAt' | 'id'> = {
			email: req.body.email,
			name: req.body.name,
			password: req.body.password
		};
		if (await User.findOne({ email: newUser.email })) return res.status(400).send({ error: 'User already registed'});
		const user = await User.create(newUser);

		res.status(200).send({
			status: 'ok',
			token: generateToken({ id: user.id })
		});
	}

	async authenticate(req: BodyRequest<authenticateUserDTO>, res: Response) {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email }).select('+password');
		if (!user) return res.status(400).send({ error: 'User not found' });
		if (!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: 'email or password incorrect.' });

		res.status(200).send({
			status: 'ok',
			token: generateToken({ id: user.id })
		});
	}
}
