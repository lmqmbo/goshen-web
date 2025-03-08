const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const path = require('path');
const app = express();
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

connectDB();
app.use(express.json());

app.use('/api/rooms/', roomRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`listening on port ${port}`));
