import mongoose from "../database";

export interface GuestDTO {
	_id: string;
	name: string;
	type?: string;
}

const GuestSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
	}

}, {
	collection: 'Guest',
	versionKey: false
});

const Guest = mongoose.model('Guest', GuestSchema);
export default Guest;