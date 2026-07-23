import { Router } from "express";
import { MFController } from "../controllers/mfController";
import { mfAuth } from "../middleware/mfAuth";

const router = Router();

router.get(
  "/portfolio/:investorId",
  mfAuth,
  MFController.getPortfolio
);

router.get(
  "/sips/:investorId",
  mfAuth,
  MFController.getSIPs
);

router.get(
  "/transactions/:investorId",
  mfAuth,
  MFController.getTransactions
);

router.get(
  "/nav/:fundName",
  mfAuth,
  MFController.getNAVHistory
);

export default router;