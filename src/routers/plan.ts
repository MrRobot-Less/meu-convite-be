import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import Plan from "../controllers/plan";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);

const service = new Plan();
router.get(
	'/:id',
	service.id
);
export default router;