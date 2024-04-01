import { listCustomersWithBookedData,getCustomerBookings } from '../controllers/customerController.js';

import {Router } from 'express'

const customer=Router();


customer.get('/current',listCustomersWithBookedData)

customer.get('/allbookings/:customerName',getCustomerBookings)




export default customer;