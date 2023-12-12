import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import Payment from "../controllers/payment";
import { ParamsType, validator } from "../middlewares/validator";
import { paymentFromAnItemSchema } from "../dtos/payment";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);

const service = new Payment();
router.post(
	'/',
	validator({
		schema: paymentFromAnItemSchema,
		type: ParamsType.BODY
	}),
	service.checkout
);

export default router;