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

InviteSchema.pre('deleteOne', async function(errorCb, invite) {
	const { guests } = (invite as InviteDTO);
	try { await Guest.deleteMany({ _id: { $in: guests }}); }
	catch (error) { errorCb(error as mongoose.CallbackError); }
});

const Invite = mongoose.model('Invite', InviteSchema);
export default Invite;