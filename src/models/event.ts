import mongoose from "../database";

export interface EventDTO {
	id: string;
	name: string;
	hasQrCode: boolean;
	subscriptionId: string;
	invites: string[]
}

const EventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	hasQrCode: {
		type: Boolean,
		required: true
	},
	subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
		required: true,
    },
	invites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Invite',
		required: true,
		default: [],
    }
}, {
	collection: 'Event',
	versionKey: false
});

const Event = mongoose.model('Event', EventSchema);
export default Event;