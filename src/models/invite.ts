import mongoose from "../database";

export interface InviteDTO {
	id: string;
	name: string;
	guests: string[];
}

const InviteSchema = new mongoose.Schema({
	name: {
		type: String,
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

const Invite = mongoose.model('Invite', InviteSchema);
export default Invite;