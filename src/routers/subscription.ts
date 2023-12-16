import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import SubscriptionCtrl from "../controllers/subscription";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);

const controller = new SubscriptionCtrl();
router.get(
	'/',
	controller.index
);
export default router;