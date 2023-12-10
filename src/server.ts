import express from 'express';
import bodyParser from 'body-parser';
import errorHandle from './middlewares/error';
import router from './routers';

const app = express();
const PORT = 3000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routers
app.use(router);
app.use(errorHandle);

app.listen(PORT, () => `server running on port ${PORT}`);