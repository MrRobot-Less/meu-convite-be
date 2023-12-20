import { isValidObjectId } from "mongoose";
import { AppError } from "../dtos/error";
import Invite, { InviteDTO } from "../models/invite";
import { addAnInviteDTO } from "../dtos/invite";
import { GuestService } from "./guest";

export const InviteService = {
	get: function(id: string, cb: (err: AppError | null, invite?: InviteDTO) => void){
		if (!isValidObjectId(id)) return cb(new AppError('provide a valid id'));
		Invite.findById(id)
			.then(invite => {
				if (!invite) throw new AppError('invite not found');
				cb(null, invite.toObject());
			}).catch(cb);
	},
	create: function(eventId: string, data: addAnInviteDTO, cb: (err: AppError | null, invite?: InviteDTO) => void) {
		var queue : Promise<string>[] = data.guests.map(guest =>
			new Promise((resolve, reject) => GuestService.create(guest, (err, guest) => {
				if (err || !guest) return reject(err);
				resolve(guest._id);
			})));

		Promise.all(queue)
			.then(guests => {
				Invite.create({
					eventId,
					name: data.name,
					guests
				})
					.then(invite => {
						cb(null, invite.toObject());
					}).catch(cb);			
			}).catch(cb)
	}
}