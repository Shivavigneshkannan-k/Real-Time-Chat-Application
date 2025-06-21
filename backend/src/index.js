import {express,app,server} from "./socket/socket.js"
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./utils/dbConnect.js";
import errorHandler from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
    credentials: true
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/", (req, res) => {
  res.status(404).json({ success: false, message: "No such api" });
});

app.use(errorHandler);

const connectSever = async () => {
  const db = await dbConnection();
  if (db) {
    server.listen(PORT, () => {
      console.log("server is listening on port ", PORT);
    });
  }
};

connectSever();