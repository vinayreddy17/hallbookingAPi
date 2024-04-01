import mongoose from "mongoose";

const {Schema} = mongoose

const bookingSchema = new Schema(
    { CustomerName:String,
        
                roomName: String,
                bookingDate: Date,
                bookingStatus: String,
                bookingId: String,
                startTime: Date,
                endTime: Date,
                date: Date
            }
        

)

const bookingModel=mongoose.model('Bookings',bookingSchema);

export default bookingModel;



