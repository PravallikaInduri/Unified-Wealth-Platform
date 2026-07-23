import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import mfRoutes from "./routes/mfRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/mf", mfRoutes);

app.get("/", (req, res) => {
  res.send("MF Server Running");
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`MF Server running on port ${PORT}`);
});