import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import PaymentCtrl from "../controllers/payment";
import { ParamsType, validator } from "../middlewares/validator";
import { paymentFromAnItemSchema } from "../dtos/payment";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);

const controller = new PaymentCtrl();
router.post(
	'/plan/:payment_method_id',
	validator({
		schema: paymentFromAnItemSchema,
		type: ParamsType.BODY
	}),
	controller.planCheckout
);

export default router;