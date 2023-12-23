import { z } from "zod";
import { addAGuestSchema, setAGuestSchema } from "./guest";

export const addAnInviteSchema = {
    name: z.string(),
	guests: addAGuestSchema.guest.array().min(1)
};

const addAnInviteObject = z.object(addAnInviteSchema);
export type addAnInviteDTO = z.infer<typeof addAnInviteObject>;


export const setAnInviteSchema = {
    name: z.string(),
	guests: setAGuestSchema.guest.array().min(1)
};

const setAnInviteObject = z.object(setAnInviteSchema);
export type setAnInviteDTO = z.infer<typeof setAnInviteObject>;
