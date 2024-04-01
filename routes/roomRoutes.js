import {createRoom,listRooms} from "../controllers/roomController.js";
import { Router } from "express";

const room = Router();

room.post("/createRoom", createRoom);

room.get('/listRooms',listRooms)




export default room;