import { z } from "zod";

export const webhookUpdateSchema = {
    type: z.string(),
};

const webhookUpdateObject = z.object(webhookUpdateSchema);
export type webhookUpdateDTO = z.infer<typeof webhookUpdateObject> & {
	'data.id'?: string
};