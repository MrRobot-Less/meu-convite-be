import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { ParamsType, validator } from "../middlewares/validator";
import { createAnEventSchema } from "../dtos/event";
import EventCtrl from "../controllers/event";
import { addAnInviteSchema } from "../dtos/invite";
import subscriptionMiddleware from "../middlewares/subscription";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);
router.use(subscriptionMiddleware);

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

router.post(
	'/:id/new-invite',
	validator({
		schema: addAnInviteSchema,
		type: ParamsType.BODY
	}),
	controller.addInvite
);

export default router;