import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import dbConnection from "./utils/dbConnect.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
    credentials: true
  })
);
const PORT = process.env.PORT || 5000;



dbConnection().then(()=>{
  app.listen(PORT, () => {
  console.log("server is listening on port ", PORT);
});
})