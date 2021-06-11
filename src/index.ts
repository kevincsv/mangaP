// *******************   REQUIREMENTS   ******************* \\
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import express, {Request, Response} from "express";
import cors from 'cors';
import mongoose from "mongoose";
import morgan from 'morgan'

import apiErrorHandler from './middlewares/apiErrorHandler';
import makeReqGet from "./tools/makeReqGet";
import makeResToJSON from "./tools/makeResToJSON";
import './database';

// *******************   INITIALIZATIONS   ******************* \\

import routes from "./routes/mangas";

import routes0 from "./routes/auth";

import routes01 from "./routes/redirections";

mongoose.set('returnOriginal', false);
const app = express();

app.use(cors());
app.use(makeReqGet);
app.use(makeResToJSON);

// *******************   SERVER SETTINGS   ******************* \\
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

// *******************   MIDDLEWARES   ******************* \\
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// *******************   SERVER ROUTES   ******************* \\
app.use('/mangas', routes);
app.use('/users', routes0);
app.use('/', routes01);

// *******************   404 ERROR HANDLER    ******************* \\
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        error: 'Unable to process your request!'
    });
});

// *******************   ERROR HANDLER    ******************* \\
app.use(apiErrorHandler);

// *******************   LOG FOR SERVER STARTING   ******************* \\
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});