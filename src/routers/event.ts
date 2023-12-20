import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { ParamsType, validator } from "../middlewares/validator";
import { createAnEventSchema } from "../dtos/event";
import EventCtrl from "../controllers/event";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);

const controller = new EventCtrl();
router.post(
	'/create-an-event',
	validator({
		schema: createAnEventSchema,
		type: ParamsType.BODY
	}),
	controller.createAnEvent
);

router.get(
	'/:id',
	controller.get
);

router.post(
	'/:id',
	validator({
		schema: createAnEventSchema,
		type: ParamsType.BODY
	}),
	controller.set
);

export default router;