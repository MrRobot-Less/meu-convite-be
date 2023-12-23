import mongoose from "../database";

export interface PlanDTO {
	_id: string;
	name: string;
	price: number;
	limitEvents: number;
	duration: number; // months
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
	limitEvents: {
		type: Number,
		required: true
	},
	duration: {
		type: Number,
		default: 1
	},
}, {
	collection: 'Plan',
	versionKey: false
});

const Plan = mongoose.model('Plan', PlanSchema);
export default Plan;