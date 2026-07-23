import { Router } from "express";

import {
  authenticateToken
} from "../middleware/authMiddleware";

import {
  authorizeRoles
} from "../middleware/roleMiddleware";

import {
  RMController
} from "../controllers/rmController";

const router = Router();

router.get(
  "/investors",
  authenticateToken,
  authorizeRoles(1, 3),
  RMController.getAllInvestors
);

export default router;