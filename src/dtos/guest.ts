import { z } from "zod";

export const addAGuestSchema = {
	guest: z.object({
		name: z.string(),
		type: z.string().optional()
	})
};

const addAGuestObject = z.object(addAGuestSchema);
export type addAGuestDTO = z.infer<typeof addAGuestObject>;


export const setAGuestSchema = {
	guest: z.object({
		id: z.string().optional(),
		name: z.string(),
		type: z.string().optional()
	})
};

const setAGuestObject = z.object(setAGuestSchema);
export type setAGuestDTO = z.infer<typeof setAGuestObject>;
