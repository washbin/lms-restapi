import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import {
  errorHandler,
  notFoundHandler,
} from "./api/middlewares/errorhandler.js";
import { ChapterRouter } from "./api/routes/ChapterRoutes.js";

const PORT = parseInt(process.env.PORT) || 3000;
const MONGO_CONNECTION_URI =
  process.env.MONGO_CONNECTION_URI || "mongodb://localhost:27017/test";

mongoose
  .connect(MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/chapters", ChapterRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
