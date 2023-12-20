import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import PlanCtrl from "../controllers/plan";
import subscriptionMiddleware from "../middlewares/subscription";
import InviteCtrl from "../controllers/invite";

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
export default router;