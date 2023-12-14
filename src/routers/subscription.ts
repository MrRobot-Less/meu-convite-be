import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import SubscriptionCtrl from "../controllers/subscription";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);

const service = new SubscriptionCtrl();
router.get(
	'/',
	service.index
);
export default router;