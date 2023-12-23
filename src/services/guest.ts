import { isValidObjectId } from "mongoose";
import Guest, { GuestDTO } from "../models/guest";
import { AppError } from "../dtos/error";
import { setAnInviteDTO } from "../dtos/invite";

export const GuestService = {
	get: function(id: string, cb: (err: AppError | null, guest?: GuestDTO) => void){
		if (!isValidObjectId(id)) return cb(new AppError('Provide a valid id.'));
		Guest.findById(id)
			.then(guest => {
				if (!guest) throw new AppError('Guest not found.');
				cb(null, guest.toObject());
			})
			.catch(cb);
	},
	set: function(id: string, data: Omit<GuestDTO, '_id'>, cb: (err: AppError | null, guest?: GuestDTO) => void) {
		if (!isValidObjectId(id)) return cb(new AppError('Provide a valid id.'));
		Guest.findByIdAndUpdate(id, { $set: data }).
			then((guest) => {
				if (!guest) throw new AppError('Guest not found.');
				cb(null, guest?.toObject());
			}).catch(cb);
	},
	create: function(data: Omit<GuestDTO, '_id'>, cb: (err: AppError | null, guest?: GuestDTO) => void) {
		Guest.create(data)
			.then(guest => {
				cb(null, guest.toObject());
			}).catch(cb);
	},
	createMany: function(guests: Omit<GuestDTO, '_id'>[], cb: (err: AppError | null, guestsId?: string[]) => void) {
		var queue : Promise<string>[] = guests.map(guest =>
			new Promise((resolve, reject) => GuestService.create(guest, (err, guest) => {
				if (err || !guest) return reject(err);
				resolve(guest._id.toString());
			})));

		Promise.all(queue)
			.then(ids => { cb(null, ids); })
			.catch(cb);
	},
	createOrUpdate: function(data: Omit<setAnInviteDTO, 'name'>, cb: (err: AppError | null, guestsId?: string[]) => void) {
		var queue: Promise<string>[] = data.guests.map(guest =>
			new Promise((resolve, reject) => {
				if (guest.id) {
					return GuestService.set(guest.id, { name: guest.name, type: guest.type }, (err, guest) => {
						if (err || !guest) return reject(err);
						resolve(guest._id.toString());
					});
				}
				GuestService.create(guest, (err, guest) => {
					if (err || !guest) return reject(err);
					resolve(guest._id.toString());
				});
			}));

		Promise.all(queue)
			.then(ids => { cb(null, ids); })
			.catch(cb);
	},
	delete: function(id: string, cb: (err: AppError | null, deleted?: boolean) => void) {
		Guest.deleteOne({ _id: id }).then(result => {
			if (result.deletedCount > 0) return cb(null);
			cb(new AppError('The guest was not removed. Please, verify the request.'))
		}).catch(cb);
	},
}