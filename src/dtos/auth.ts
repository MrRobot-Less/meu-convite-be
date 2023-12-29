import { z } from "zod";
import { UserDTO } from "../models/user";

export type JwtPayload = {
	id: string
}

export const registerUserSchema = {
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    name: z.string().regex(/^[a-zA-Z\s]{3,}$/),
	password: z.string().min(6, 'Name should have at least 6 characters'),
};

const registerUserObject = z.object(registerUserSchema);
export type registerUserDTO = z.infer<typeof registerUserObject>;

export const authenticateUserSchema = {
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
	password: z.string().min(6, 'Name should have at least 6 characters'),
};

const authenticateUserObject = z.object(authenticateUserSchema);
export type authenticateUserDTO = z.infer<typeof authenticateUserObject>;

export type authenticatedObject = Omit<UserDTO, 'createdAt' | 'password'> & {
	token: string
};