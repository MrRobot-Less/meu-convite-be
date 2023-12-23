import { isValidObjectId } from "mongoose";
import { AppError } from "../dtos/error";
import Invite, { InviteDTO } from "../models/invite";
import { addAnInviteDTO, setAnInviteDTO } from "../dtos/invite";
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
		GuestService.createMany(data.guests, (err, guestsId) => {
			if (err) return cb(err);
			Invite.create({
				eventId,
				name: data.name,
				guests: guestsId
			})
				.then(invite => {
					cb(null, invite.toObject());
				}).catch(cb);
		});
	},
	delete: function(id: string, cb: (err: AppError | null) => void) {
		Invite.deleteOne({ _id: id }).then(() => cb(null)).catch(cb);
	},
	set: function(id: string, data: setAnInviteDTO, cb: (err: AppError | null, invite?: InviteDTO) => void) {
		InviteService.get(id, (err, invite) => {
			if (err || !invite) return cb(err);
			GuestService.createOrUpdate({ guests: data.guests }, (err, guestsId) => {
				if (err) return cb(err);
				Invite.findByIdAndUpdate(id, {
					$set: {
						name: data.name,
						guests: guestsId
					}
				}).then(invite => {
					if (!invite) throw new AppError('invite not found');
					cb(null, invite.toObject());
				}).catch(cb);
			});
		});
	}
}