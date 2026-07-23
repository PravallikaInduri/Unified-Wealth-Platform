import { Router } from "express";

import {
  authenticateToken,
  AuthRequest
} from "../middleware/authMiddleware";

import {
  authorizeRoles
} from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/profile",
  authenticateToken,
  (req: AuthRequest, res) => {

    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

router.get(
  "/admin",
  authenticateToken,
  authorizeRoles(1),
  (req: AuthRequest, res) => {

    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

export default router;