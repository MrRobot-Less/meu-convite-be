import mongoose from "../database";
const bcrypt = require('bcryptjs');

export interface UserDTO {
	_id: string;
	email: string;
	name: string;
	password: string;
	createdAt: Date
}

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
}, {
	collection: 'User',
	versionKey: false
});

UserSchema.pre('save', async function(next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
	next();
});

const User = mongoose.model('User', UserSchema);
export default User;