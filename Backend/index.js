import express from "express";
import dotenv from "dotenv";
import Database from "./Database/Database.js";
import cors from "cors";
import AllRouter from "./Router/AllRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("hiii");
});

app.use("/api", AllRouter);

Database();

app.listen(process.env.PORT, () => {
  console.log("Backend Is running on :", process.env.PORT);
});
