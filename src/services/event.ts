import { AnyKeys, isValidObjectId } from "mongoose";
import { AppError } from "../dtos/error";
import Event, { EventDTO } from "../models/event";
import { changeAnEventDTO, createAnEventDTO } from "../dtos/event";
import moment from "moment";

export const EventService = {
	get: function(id: string, cb: (err: AppError | null, event?: EventDTO) => void){
		if (!isValidObjectId(id)) return cb(new AppError('Provide a valid id.'));
		Event.findById(id)
			.then(event => {
				if (!event) throw new AppError('Event not found.');
				cb(null, event.toObject());
			})
			.catch(cb);
	},
	create: function(data: Omit<EventDTO, '_id' | 'createdAt'>, cb: (err: AppError | null, event?: EventDTO) => void) {
		Event.create(data).then(event => {
			cb(null, event.toObject());
		}).catch(cb)
	},
	set: function(id: string, data: AnyKeys<Omit<createAnEventDTO, '_id' | 'createdAt'>>, cb: (err: AppError | null) => void) {
		if (!isValidObjectId(id)) return cb(new AppError('Provide a valid id.'));
		Event.updateOne({ _id: id }, { $set: data })
			.then(() => cb(null))
			.catch(cb)
	},
	getAllBySubscription: function(subscriptionId: string, cb: (err: AppError | null, event?: EventDTO[]) => void) {
		Event.find({ subscriptionId }).then(events => {
			cb(null, events.map(event => event.toObject()));
		}).catch(cb)
	}
}