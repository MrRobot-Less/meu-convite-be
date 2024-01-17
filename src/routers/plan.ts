import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import PlanCtrl from "../controllers/plan";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);

const controller = new PlanCtrl();

router.get(
	'/',
	controller.all
);

router.get(
	'/:id',
	controller.get
);

export default router;