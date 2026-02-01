import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";


import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;



// middlewares to  :access req.body
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());
app.use(rateLimiter);

// our simple custom middleware
// app.use((request, response, next) => {
//   console.log("we got a request:", request.method, "at", request.url);  
//   next();
// });

app.use("/api/notes", notesRoutes);

// connect to database
connectDB().then(() => {
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
});

