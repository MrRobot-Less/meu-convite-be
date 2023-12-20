import { z } from "zod";
import { addAGuestSchema } from "./guest";

export const addAnInviteSchema = {
    name: z.string(),
	guests: addAGuestSchema.guest.array().min(1)
};

const addAnInviteObject = z.object(addAnInviteSchema);
export type addAnInviteDTO = z.infer<typeof addAnInviteObject>;
