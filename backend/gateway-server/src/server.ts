import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import testRoutes from "./routes/testRoutes";
import wealthRoutes from "./routes/wealthRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import adminRoutes from "./routes/adminRoutes";
import investorRoutes from "./routes/investorRoutes";
import rmRoutes from "./routes/rmRoutes";
import opsRoutes from "./routes/opsRoutes";
import mappingRoutes from "./routes/mappingRoutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/wealth", wealthRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/admin", adminRoutes);
app.use("/investor", investorRoutes);
app.use("/rm", rmRoutes);
app.use("/ops", opsRoutes);
app.use("/mapping", mappingRoutes);

app.get("/", (req, res) => {
  res.send(
    "Gateway Server Running"
  );
});

const PORT =
  process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Gateway Server running on port ${PORT}`
  );
});