import { CallbackError } from "mongoose";
import mongoose from "../database";
import Guest from "./guest";

export interface InviteDTO {
	_id: string;
	name: string;
	eventId: string;
	guests: string[];
}

const InviteSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
		required: true
    },
	guests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Guest',
		required: true,
		default: [],
    },

}, {
	collection: 'Invite',
	versionKey: false
});

InviteSchema.pre('deleteOne', async function(next) {
	try {
		const doc : InviteDTO | null = await this.model.findOne(this.getQuery());
		if (doc) await Guest.deleteMany({ _id: { $in:  doc.guests }});
	}
	catch(error) { next(error as CallbackError); }
});

const Invite = mongoose.model('Invite', InviteSchema);
export default Invite;