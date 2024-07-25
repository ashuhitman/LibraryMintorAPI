import express, { json } from "express";
import mysql from "mysql2/promise";
import authRouter from "./routes/auth.js";
import reportsRouter from "./routes/reports.js";
import libraryInfoRouter from "./routes/libraryInfo.js";
import cors from "cors";
import { checkDbConnection } from "./db/config.js";

//create new app
const app = express();

//middlewares
// cors
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
//routes
app.use("/auth", authRouter);
app.use("/reports", reportsRouter);
app.use("/libraryinfo", libraryInfoRouter);

//port number
const PORT = process.env.PORT;

//start the server
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);

  // Execute the check before starting the server
  checkDbConnection();
});
