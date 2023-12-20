import { isValidObjectId } from "mongoose";
import Guest, { GuestDTO } from "../models/guest";
import { AppError } from "../dtos/error";
import { addAGuestDTO } from "../dtos/guest";

export const GuestService = {
	get: function(id: string, cb: (err: AppError | null, guest?: GuestDTO) => void){
		if (!isValidObjectId(id)) return cb(new AppError('provide a valid id'));
		Guest.findById(id)
			.then(guest => {
				if (!guest) throw new AppError('guest not found');
				cb(null, guest.toObject());
			})
			.catch(cb);
	},
	create: function(data: Omit<GuestDTO, '_id'>, cb: (err: AppError | null, guest?: GuestDTO) => void) {
		Guest.create(data)
			.then(guest => {
				cb(null, guest.toObject());
			}).catch(cb);
	}
}