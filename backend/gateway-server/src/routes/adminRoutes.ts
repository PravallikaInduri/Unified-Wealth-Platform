import { Router } from "express";

import {
  authenticateToken
} from "../middleware/authMiddleware";

import {
  authorizeRoles
} from "../middleware/roleMiddleware";

import {
  AdminController
} from "../controllers/adminController";

const router = Router();

/* USERS */

router.get(
  "/users",
  authenticateToken,
  authorizeRoles(1),
  AdminController.getAllUsers
);

router.post(
  "/users",
  authenticateToken,
  authorizeRoles(1),
  AdminController.createUser
);

router.put(
  "/users/:id",
  authenticateToken,
  authorizeRoles(1),
  AdminController.updateUser
);

router.delete(
  "/users/:id",
  authenticateToken,
  authorizeRoles(1),
  AdminController.deleteUser
);

/* AUDIT LOGS */

router.get(
  "/audit-logs",
  authenticateToken,
  authorizeRoles(1),
  AdminController.getAuditLogs
);

export default router;