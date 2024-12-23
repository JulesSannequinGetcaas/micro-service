import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
