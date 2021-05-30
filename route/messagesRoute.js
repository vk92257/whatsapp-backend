import express from 'express';
import {sendNewMessage , getAllMessage} from '../controller/messageController.js'
const messageRoute = express.Router();

messageRoute.route("/new").post(sendNewMessage);
messageRoute.route("/sync").get(getAllMessage);


export default messageRoute;