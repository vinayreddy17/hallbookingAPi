
import roomModel from '../models/roomModel.js';
import bookingModel from '../models/bookingModel.js';

const createRoom=async(req,res)=>{
  const{roomNo,seats,amenities,price}=req.body;
  
  try {
    const newRoom = await roomModel.create({
      capacity:seats,
      amenities:amenities,
      price:price,
      roomNo:roomNo
    })
    res.status(201).json({message:'Room Created successfully',room:newRoom.roomNo})
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
  



}




const listRooms = async (req, res) => {
  try {
    // Fetch all rooms
    const rooms = await roomModel.find();

    // Array to store room details with booking information
    const roomsWithBookings = [];

    // Iterate over each room
    for (const room of rooms) {
      // Check if the room is currently booked
      const booking = await bookingModel.findOne({
        roomName: room.roomNo,
        bookingStatus: 'booked', // Check if there is a booking with status 'booked'
      });

      // Object to store room details with booking information
      const roomWithBooking = {
        roomName: room.roomNo,
        bookedStatus: room.bookedStatus.isAvailable ? 'available' : 'booked',
        customerName: booking ? booking.CustomerName : null,
        date: booking ? booking.bookingDate : null,
        startTime: booking ? booking.startTime : null,
        endTime: booking ? booking.endTime : null,
      };

      roomsWithBookings.push(roomWithBooking);
    }

    res.status(200).json({ rooms: roomsWithBookings });
  } catch (error) {
    console.error('Error listing rooms:', error);
    res.status(500).json({ error: 'Failed to list rooms' });
  }
};

export {createRoom,listRooms}