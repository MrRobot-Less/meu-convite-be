import MercadoPagoConfig, { Customer, Payment, PaymentMethod, Preference } from "mercadopago";
import * as dotenv from "dotenv";
dotenv.config({ path: process.env.PWD+'/.env' });

const accessToken = process.env.NODE_ENV === 'development' ? process.env.MP_ACCESS_TOKEN_DEVELOP : process.env.MP_ACCESS_TOKEN_PROD;

const client = new MercadoPagoConfig({
	accessToken: accessToken || ''
});

export const payment = new Payment(client);
export const paymentMethod = new PaymentMethod(client);
export const customerClient = new Customer(client);
export const preference = new Preference(client);