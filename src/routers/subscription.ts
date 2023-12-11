import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { ParamsType, validator } from "../middlewares/validator";
import Subscription from "../controllers/subscription";
import { subscribeSchema } from "../dtos/subcription";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);

const service = new Subscription();
router.get(
	'/subscribe',
	validator({
		schema: subscribeSchema,
		type: ParamsType.QUERY,
	}),
	service.subscribe
);
export default router;