import { Router } from "express";

import {
  authenticateToken
} from "../middleware/authMiddleware";

import {
  authorizeRoles
} from "../middleware/roleMiddleware";

import {
  OpsController
} from "../controllers/opsController";

const router = Router();

router.get(
  "/audit-logs",
  authenticateToken,
  authorizeRoles(1, 4),
  OpsController.getAuditLogs
);

export default router;