import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { ParamsType, validator } from "../middlewares/validator";
import { subscribeSchema } from "../dtos/subcription";
import SubscriptionCtrl from "../controllers/subscription";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);

const service = new SubscriptionCtrl();
router.get(
	'/subscribe',
	validator({
		schema: subscribeSchema,
		type: ParamsType.QUERY,
	}),
	service.subscribe
);
export default router;