import { Router } from "express";
import Webhook from "../controllers/webhook";

const router = Router();
const service = new Webhook();

router.post(
	'/payment/update',
	service.update
);
export default router;