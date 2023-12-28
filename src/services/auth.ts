import { AppError } from "../dtos/error";
import jwt from 'jsonwebtoken';
import { JwtPayload, authenticateUserDTO } from "../dtos/auth";
import User, { UserDTO } from "../models/user";

const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth.json');

function generateToken(params: any) {
	const token = jwt.sign(params, authConfig.secret, {
		expiresIn: 60 * 60 * 24 * 14 // two weeks
	});
	return token;
}

export const AuthService = {
	register: async function(newUser: Omit<UserDTO, 'createdAt' | '_id'>, cb: (error: AppError | null, token?: string) => void) {
		try {
			if (await User.findOne({ email: newUser.email })) return cb(new AppError('User already registered.'));
			const user = await User.create(newUser);
			cb(null, generateToken({ id: user.id }));
		} catch (err) {
			cb(err as AppError);
		}
	},
	authenticate: async function({ email, password }: authenticateUserDTO, cb: (err: AppError | null, token?: string) => void) {
		try {
			const user = await User.findOne({ email: email }).select('+password');
			if (!user) return cb(new AppError('User not found.'));
			if (!await bcrypt.compare(password, user.password)) return cb(new AppError('The email or password incorrect.'));
			cb(null, generateToken({ id: user.id }));
		} catch (err) {
			cb(err as AppError);
		}
	},
	validate: function(token: string, cb: jwt.VerifyCallback<string | jwt.JwtPayload | JwtPayload>){
		jwt.verify(token, authConfig.secret, cb);
	}
}