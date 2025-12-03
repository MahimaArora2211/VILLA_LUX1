const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ------------------------------
// Middleware
// ------------------------------
app.use(cors());
app.use(express.json());

// ------------------------------
// 1) Connect to MongoDB
// ------------------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/VILLALUX") // no deprecated options
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// ------------------------------
// 2) User Schema + Model
// ------------------------------
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// ------------------------------
// 3) Villa Booking Schema + Model
// ------------------------------
const BookingSchema = new mongoose.Schema({
  personName: String,
  villaName: String,
  date: String,
  price: Number,
});

const Booking = mongoose.model("Booking", BookingSchema);

// ------------------------------
// 4) Default Test Route
// ------------------------------
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ------------------------------
// 5) Signup Route
// ------------------------------
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password });
    await user.save();

    console.log("Signup saved:", user);
    res.json({ message: "Signup successful!", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------------
// 6) Login Route
// ------------------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password)
      return res.status(400).json({ message: "Wrong password" });

    console.log("Login successful:", user);
    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------------
// 7) Save Villa Booking
// ------------------------------
app.post("/book-villa", async (req, res) => {
  const { personName, villaName, date, price } = req.body;

  try {
    const booking = new Booking({ personName, villaName, date, price });
    await booking.save();

    console.log("Booking saved:", booking);
    res.json({ message: "Villa booked successfully!", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------------
// 8) GET all users
// ------------------------------
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ------------------------------
// 9) GET all bookings
// ------------------------------
app.get("/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// ------------------------------
// 10) Start Server
// ------------------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
