import mongoose from "../database";

export interface SubscriptionDTO {
	id: string;
	userId: string;
	planId: string;
	createdAt: Date;
	expires: boolean;
}

const SubscriptionSchema = new mongoose.Schema({
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
		required: true,
	},
	expires: {
		type: Boolean,
		default: false,
		required: true,
	}
}, {
	collection: 'Subscription',
	versionKey: false
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
export default Subscription;