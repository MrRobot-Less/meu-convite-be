import { z } from "zod";

export const paymentFromAnItemSchema = {
    itemId: z.string().min(24, 'provide a valid id'),
	model: z.string(),
	payment_method_id: z.string()
};

const paymentFromAnItemObject = z.object(paymentFromAnItemSchema);
export type paymentFromAnItemDTO = z.infer<typeof paymentFromAnItemObject>;