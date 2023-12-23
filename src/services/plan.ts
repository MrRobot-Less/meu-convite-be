import { isValidObjectId } from "mongoose";
import Plan, { PlanDTO } from "../models/plan";
import { AppError } from "../dtos/error";

export const PlanService = {
	get: function(id: string, cb: (err: AppError | null, plan?: PlanDTO) => void){
		if (!isValidObjectId(id)) return cb(new AppError('Provide a valid id.'));
		Plan.findById(id)
			.then(plan => {
				if (!plan) throw new AppError('Plan not found.');
				cb(null, plan.toObject());
			})
			.catch(cb);
	} 
}