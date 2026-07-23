import { Router } from "express";

import {
  authenticateToken
} from "../middleware/authMiddleware";

import {
  DashboardController
} from "../controllers/dashboardController";

const router = Router();

router.get(
  "/summary/:investorId",
  authenticateToken,
  DashboardController.getSummary
);

router.get(
  "/allocation/:investorId",
  authenticateToken,
  DashboardController.getAllocation
);

router.get(
  "/transactions/:investorId",
  authenticateToken,
  DashboardController.getRecentTransactions
);

router.get(
  "/admin-summary",
  authenticateToken,
  DashboardController.getAdminSummary
);

export default router;