import { z } from "zod";

export const subscribeSchema = {
    planId: z.string().min(24, 'provide a valid id')
};

const subscribeObject = z.object(subscribeSchema);
export type subscribeDTO = z.infer<typeof subscribeObject>;