import { z } from "zod";

export const getEventSchema = {
    id: z.string()
};
const getEventObject = z.object(getEventSchema);
export type getEventDTO = z.infer<typeof getEventObject>;