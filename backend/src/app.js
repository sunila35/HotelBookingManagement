const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const redisClient = require("./config/redis");

connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use(express.static('src/uploads'));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hotel Booking API is running...");
});

app.use('/api/hotels', require('./api/routes/hotels'));
app.use('/api/bookings', require('./api/routes/bookings'));
app.use('/api/payments', require('./api/routes/payments'));
app.use('/api/search', require('./api/routes/search'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});