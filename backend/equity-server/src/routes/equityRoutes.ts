import { Router } from "express";
import { EquityController } from "../controllers/equityController";
import { serviceAuth } from "../middleware/serviceAuth";

const router = Router();

router.get(
  "/holdings/:investorId",
  serviceAuth,
  EquityController.getHoldings
);

router.get(
  "/transactions/:investorId",
  serviceAuth,
  EquityController.getTransactions
);

export default router;