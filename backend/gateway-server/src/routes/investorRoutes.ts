import { Router } from "express";

import {
  authenticateToken
} from "../middleware/authMiddleware";

import {
  authorizeRoles
} from "../middleware/roleMiddleware";

import {
  InvestorController
} from "../controllers/investorController";

const router = Router();

router.get(
  "/profile/:investorId",
  authenticateToken,
  authorizeRoles(1, 2),
  InvestorController.getProfile
);

export default router;