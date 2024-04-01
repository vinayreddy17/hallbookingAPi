import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema({
  roomNo: {
    type: Number,
    unique: true,
  },
  capacity: Number,
  amenities: [String],
  bookedStatus: {
    isAvailable: {
      type: Boolean,
      default: true,
    },
    bookedBy: { type: String, default: null },
    bookingDate: { type: Date, default: null },
    StartTime: { type: Date, default: null },
    EndTime: { type: Date, default: null },
  },
});

const roomModel = mongoose.model("Rooms", roomSchema);

export default roomModel;
