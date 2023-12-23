import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import subscriptionMiddleware from "../middlewares/subscription";
import InviteCtrl from "../controllers/invite";
import { ParamsType, validator } from "../middlewares/validator";
import { setAnInviteSchema } from "../dtos/invite";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);
router.use(subscriptionMiddleware);

const controller = new InviteCtrl();
router.get(
	'/:id',
	controller.get
);

router.delete(
	'/:id',
	controller.delete
);

router.post(
	'/:id',
	validator({
		schema: setAnInviteSchema,
		type: ParamsType.BODY
	}),
	controller.set
)
export default router;