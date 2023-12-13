import { z } from "zod";

export const paymentFromAnItemSchema = {
    planId: z.string().min(24, 'provide a valid id'),
    token: z.string().optional()
};

const paymentFromAnItemObject = z.strictObject(paymentFromAnItemSchema);
export type paymentFromAnItemDTO = z.infer<typeof paymentFromAnItemObject>;
export type paramsPlanPaymentDTO = { payment_method_id: string };