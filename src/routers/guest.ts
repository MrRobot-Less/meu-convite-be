import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import GuestCtrl from "../controllers/guest";

const router = Router();

// middleware to authenticate this router
router.use(authMiddleware);

const controller = new GuestCtrl();
router.delete(
	'/:id',
	controller.delete
);
export default router;