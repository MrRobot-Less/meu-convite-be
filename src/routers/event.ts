import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import Event from '../controllers/event';
import { getEventSchema } from "../dtos/event";
import { ParamsType, validator } from "../middlewares/validator";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);

const service = new Event();
router.get(
	'/',
	validator({
		schema: getEventSchema,
		type: ParamsType.QUERY,
	}),
	service.index
);
export default router;