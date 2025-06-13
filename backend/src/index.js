import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import dbConnection from "./utils/dbConnect.js";
import errorHandler from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.route.js";
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
    credentials: true
  })
);
app.use("/api/v1", authRouter);
app.use("/", (req, res) => {
  res.status(404).json({ success: false, message: "No such api" });
});

app.use(errorHandler);

const connectSever = async () => {
  const db = await dbConnection();
  if (db) {
    app.listen(PORT, () => {
      console.log("server is listening on port ", PORT);
    });
  }
};

connectSever();