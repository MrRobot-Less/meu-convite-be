import { Router } from "express";
import WebhookCtrl from "../controllers/webhook";

const router = Router();
const service = new WebhookCtrl();

router.post(
	'/payment/update',
	service.update
);
export default router;