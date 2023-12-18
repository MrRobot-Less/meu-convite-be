import { isValidObjectId } from "mongoose";
import { AppError } from "../dtos/error";
import Event, { EventDTO } from "../models/event";

export const EventService = {
	get: function(id: string, cb: (err: AppError | null, event?: EventDTO) => void){
		if (!isValidObjectId(id)) return cb(new AppError('provide a valid id'));
		Event.findById(id)
			.then(event => {
				if (!event) throw new AppError('event not found');
				cb(null, event.toObject());
			})
			.catch(cb);
	},
	create: function(data: Omit<EventDTO, 'id' | 'createAt' | 'invites'>, cb: (err: AppError | null, event?: EventDTO) => void) {
		Event.create(data).then(event => {
			cb(null, event.toObject());
		}).catch(cb)
	},
	getBySubscription: function(subscriptionId: string, cb: (err: AppError | null, event?: EventDTO) => void) {
		Event.findOne({ subscriptionId }).then(event => {
			if (!event) throw new AppError(`there is not subscription with id ${subscriptionId}`);
			cb(null, event.toObject());
		}).catch(cb)
	},
	getAllBySubscription: function(subscriptionId: string, cb: (err: AppError | null, event?: EventDTO[]) => void) {
		Event.find({ subscriptionId }).then(events => {
			if (!events.length) throw new AppError(`there is not any subscription with id ${subscriptionId}`);
			cb(null, events.map(event => event.toObject()));
		}).catch(cb)
	}
}