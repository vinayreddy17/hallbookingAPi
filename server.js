import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import room from './routes/roomRoutes.js';
import book from './routes/bookingRoutes.js';
import customer from './routes/customerRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://vinayamireddy:nencheppa@guvitasks.cw0txjq.mongodb.net/?retryWrites=true&w=majority&appName=guvitasks')
.then(()=>{console.log('database connected')})
.catch((error)=>{console.log(error)})

app.use(express.json())
// Include routes
app.use('/rooms', room);
app.use('/bookings', book);
 app.use('/customers', customer);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
