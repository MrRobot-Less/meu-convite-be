import mongoose from "../database";

export interface EventDTO {
	_id: string;
	name: string;
	hasQrCode: boolean;
	subscriptionId: string;
	address: string;
	date: Date;
}

const EventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	hasQrCode: {
		type: Boolean,
		default: false
	},
	subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
		required: true,
    },
	address: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
}, {
	collection: 'Event',
	versionKey: false
});

const Event = mongoose.model('Event', EventSchema);
export default Event;