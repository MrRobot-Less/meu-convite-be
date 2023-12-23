import { Document } from "mongoose";
import mongoose from "../database";
import { PlanDTO } from "./plan";

export interface SubscriptionDTO {
	_id: string;
	active: string;
	userId: string;
	planId: string;
	createdAt: Date;
	expiresAt: Date;
	transactionId?: string,
	plan?: PlanDTO
}

const SubscriptionSchema = new mongoose.Schema({
	active: {
		type: Boolean,
		required: true
	},
	userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
		required: true
    },
	planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
		required: true,
    },
	createdAt: {
		type: Date,
		default: Date.now,
	},
	expiresAt: {
		type: Date,
		required: true,
	},
	transactionId: {
		type: String,
	}
}, {
	collection: 'Subscription',
	versionKey: false
});

SubscriptionSchema.virtual('plan', {
	ref: 'Plan',
	localField: 'planId',
	foreignField: '_id',
	justOne: true
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
export default Subscription;