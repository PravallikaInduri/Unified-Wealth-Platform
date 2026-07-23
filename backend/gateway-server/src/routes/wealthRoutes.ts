import { Router } from "express";

import {
  authenticateToken
} from "../middleware/authMiddleware";

import {
  WealthController
} from "../controllers/wealthController";

const router = Router();

router.get(
  "/summary/:investorId",
  authenticateToken,
  WealthController.getWealthSummary
);

router.get(
  "/holdings/:investorId",
  authenticateToken,
  WealthController.getHoldings
);

export default router;