import { z } from "zod";

export const webhookUpdateSchema = {
    type: z.string(),
	'data.id': z.string()
};

const webhookUpdateObject = z.object(webhookUpdateSchema);
export type webhookUpdateDTO = z.infer<typeof webhookUpdateObject>;