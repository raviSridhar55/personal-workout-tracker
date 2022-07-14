import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/error.js";
import workoutRoutes from "./Routes/workoutRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
dotenv.config();

const app = express();

// Connect DataBase
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello This is my backend");
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`App is running on port ${PORT}`.yellow.bold)
);
