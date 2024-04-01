import mongoose from "mongoose";

const {Schema} = mongoose

const customerSchema = new Schema(
    { CustomerName:{
        type:String,
        unique:true
    },
        Bookings: [
            {
                roomName: String,
                bookingDate: Date,
                bookingStatus: String,
                bookingId: String,
                startTime: Date,
                endTime: Date,
                date: Date
            }
        ],

    }
)

const customerModel=mongoose.model('Customers',customerSchema);

export default customerModel;



