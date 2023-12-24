import { z } from "zod";

export const createAnEventSchema = {
    name: z.string(),
	hasQrCode: z.boolean(),
	address: z.string(),
	date: z.string().regex(/^\d{4}-(?:0[1-9]|1[0-2])-(?:[0-2][1-9]|[1-3]0|3[01])T(?:[0-1][0-9]|2[0-3])(?::[0-6]\d)(?::[0-6]\d)?(?:\.\d{3})?(?:[+-][0-2]\d:[0-5]\d|Z)?$/)
};

const createAnEventObject = z.object(createAnEventSchema);
export type createAnEventDTO = z.infer<typeof createAnEventObject>;

export const changeAnEventSchema = {
    name: createAnEventSchema.name.optional(),
	hasQrCode: createAnEventSchema.hasQrCode.optional(),
	address: createAnEventSchema.address.optional(),
	date: createAnEventSchema.date.optional()
};

const changeAnEventObject = z.object(changeAnEventSchema);
export type changeAnEventDTO = z.infer<typeof changeAnEventObject>;
