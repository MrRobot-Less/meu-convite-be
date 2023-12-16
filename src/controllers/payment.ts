import { NextFunction, Response } from "express";
import { BodyRequest } from "./type";
import { paramsPlanPaymentDTO, paymentFromAnItemDTO } from "../dtos/payment";
import { SubscriptionService } from "../services/subscription";

export default class PaymentCtrl {
	constructor() {}

	async planCheckout(req: BodyRequest<paymentFromAnItemDTO, paramsPlanPaymentDTO>, res: Response, next: NextFunction){
		const { planId, token } = req.body;
		const { payment_method_id } = req.params;

		SubscriptionService.create(req.userId, planId, token, payment_method_id, (err, data) => {
			if (err) return next(err);
			res.status(200).json({ redirect_to: data?.point_of_interaction?.transaction_data?.qr_code_base64 });
		});
    }
}