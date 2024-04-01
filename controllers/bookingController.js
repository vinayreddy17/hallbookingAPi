import bookingModel from "../models/bookingModel.js";
import customerModel from "../models/customerModel.js";
import roomModel from "../models/roomModel.js";

const bookRoom = async ( req, res) => {

  const room = await roomModel.findOne({ roomNo: RoomNo });

  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  if (!room.bookedStatus.isAvailable) {
    return res.status(400).json({ error: 'Room is not available for booking' });
  }
  
   const {CustomerName, RoomNo, startTime, shifts }=req.body
  const bookingDate = new Date(); 

  try {
    
    const start = new Date(startTime); 
    const endTime = new Date(start.getTime() + shifts * 12 * 60 * 60 * 1000);

    
    await roomModel.findOneAndUpdate(
      { roomNo: RoomNo },
      {
        'bookedStatus.isAvailable': false,
        'bookedStatus.bookedBy': CustomerName,
        'bookedStatus.bookingDate': bookingDate,
        'bookedStatus.StartTime': start,
        'bookedStatus.EndTime': endTime,
      }
    );


    const roombooked = await bookingModel.create({
      CustomerName:CustomerName,
      roomName: RoomNo,
      bookingDate: bookingDate,
      bookingStatus: 'booked', 
      
      startTime: start,
      endTime: endTime,
    });
  
  
    // Find the customer by name
    let customer = await customerModel.findOne({ CustomerName: CustomerName });

    if (!customer) {
      // Create a new customer if not found
      customer = await customerModel.create({
        CustomerName: CustomerName,
        Bookings: [],
      });
    }

    // Update the customer's bookings array
    customer.Bookings.push({
      roomName: RoomNo,
      bookingDate: bookingDate,
      bookingStatus: 'booked',
      bookingId: roombooked._id, // Assuming bookingModel has an _id field
      startTime: start,
      endTime: endTime,
      date: new Date(),
    });

    // Save the updated customer document
    await customer.save();
    
    res.status(200).json({
      message: 'Room booked successfully',
      booking: roombooked,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export {bookRoom}