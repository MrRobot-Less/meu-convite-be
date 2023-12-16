import { Router } from "express";
import WebhookCtrl from "../controllers/webhook";

const router = Router();
const controller = new WebhookCtrl();

router.post(
	'/payment/plan/update',
	controller.update
);
export default router;