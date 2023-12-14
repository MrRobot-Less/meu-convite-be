import mongoose from "../database";

export interface SubscriptionDTO {
	id: string;
	active: string;
	userId: string;
	planId: string;
	createdAt: Date;
	transactionId?: string
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
	transactionId: {
		type: String,
	}
}, {
	collection: 'Subscription',
	versionKey: false
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
export default Subscription;