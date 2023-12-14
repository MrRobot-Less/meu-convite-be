import express from 'express';
import bodyParser from 'body-parser';
import errorHandle from './middlewares/error';
import router from './routers';

import * as dotenv from "dotenv";
dotenv.config({ path: process.env.PWD+'/.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routers
app.use('/v1', router);
app.use(errorHandle);

app.listen(PORT, () => { 
	console.log(`[+] server running on port ${PORT}`);
});