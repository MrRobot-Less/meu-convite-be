import { CustomerRequestBody, CustomerResponse } from "mercadopago/dist/clients/customer/commonTypes";
import { customerClient } from "../config/mercadopago";
import * as dotenv from "dotenv";
import { Request } from "express";
dotenv.config({ path: process.env.PWD+'/.env' });


export const PaymentService = {
	getFullUrl: function(endpoint: string) {
		var url = process.env.API_SERVER;
		return url + endpoint;
	},

	createCustomer: async function(body : CustomerRequestBody): Promise<CustomerResponse | Error> {
		try {
			return await customerClient.create({ body: body });
		} catch (e) {
			return e as Error;
		}
	},
	
	customerExists: async function(email: string) : Promise<boolean> {
		try {
			const customer = await customerClient.search({ options: { email: email } });
			return !!customer;
		} catch (e) {
			return false
		}
	}
	
}