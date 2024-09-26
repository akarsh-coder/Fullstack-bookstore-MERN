import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookeModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors"
const app = express();

//Middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("MERN");
});

app.use("/books",booksRoute )
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:["Content-Type"]
}))
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App listining to PORT -> ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
