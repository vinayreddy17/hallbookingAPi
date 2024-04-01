import roomModel from "../models/roomModel.js";
import bookingModel from "../models/bookingModel.js";
import customerModel from '../models/customerModel.js';

const getCustomerBookings = async (req, res) => {
  try {
    const { customerName } = req.params; 
      
    const customer = await customerModel.findOne({ CustomerName: customerName });
   
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    
    const bookings = customer.Bookings;

    
    res.status(200).json({
      customerName: customerName,
      numberOfBookings: customer.Bookings.length,
      bookings: customer.Bookings,
    });
  } catch (error) {
    console.error('Error retrieving customer bookings:', error);
    res.status(500).json({ error: 'Failed to retrieve customer bookings' });
  }
}



const listCustomersWithBookedData = async (req, res) => {
  try {
  
    const rooms = await roomModel.find({
      $or: [{ "bookedStatus.isAvailable": false }],
    });
   
    
   
    const customersWithBookedData = [];

  
    for (const room of rooms) {
    
      const booking = await bookingModel.findOne({
        roomName: room.roomNo,
        bookingDate: room.bookedStatus.bookingDate, 
       
      });
   
      if (booking) {
       
        const bookedData = {
          customerName: booking.CustomerName,
          roomName: booking.roomName,
          date: booking.bookingDate,
          startTime: booking.startTime,
          endTime: booking.endTime,
        };

       
        customersWithBookedData.push(bookedData);
      }
    }

    res.status(200).json({ customers: customersWithBookedData });
  } catch (error) {
    console.error("Error listing customers with booked data:", error);
    res
      .status(500)
      .json({ error: "Failed to list customers with booked data" });
  }
};

export { listCustomersWithBookedData,getCustomerBookings };
