import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import pool from "./config/db";
import equityRoutes from "./routes/equityRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// Root Route
app.get("/", (req, res) => {
  res.send("Equity Server Running");
});


// Test DB Route
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      time: result.rows[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});


// IMPORTANT
app.use("/equity", equityRoutes);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Equity Server running on port ${PORT}`);
});