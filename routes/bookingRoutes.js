import {bookRoom} from "../controllers/bookingController.js";

import {Router } from 'express'

const book=Router();


book.post('/bookroom',bookRoom);





export default book;