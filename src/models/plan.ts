import mongoose from "../database";

export interface PlanDTO {
	id: string;
	name: string;
	price: number;
	hasQrCode: boolean;
	limitInvites: number
}

const PlanSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	hasQrCode: {
		type: Boolean,
		required: true,
		default: false
	},
	limitInvites: {
		type: Number,
		required: true
	},
}, {
	collection: 'Plan',
	versionKey: false
});

const Plan = mongoose.model('Plan', PlanSchema);
export default Plan;