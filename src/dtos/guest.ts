import { z } from "zod";

export const addAGuestSchema = {
	guest: z.object({
		name: z.string(),
		type: z.string().optional()
	})
};

const addAGuestObject = z.object(addAGuestSchema);
export type addAGuestDTO = z.infer<typeof addAGuestObject>;
