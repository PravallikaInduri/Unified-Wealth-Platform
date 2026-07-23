import { Router } from "express";

import {
  authenticateToken
} from "../middleware/authMiddleware";

import {
  authorizeRoles
} from "../middleware/roleMiddleware";

import {
  MappingController
} from "../controllers/mappingController";

const router = Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles(1),
  MappingController.getMappings
);

router.post(
  "/",
  authenticateToken,
  authorizeRoles(1),
  MappingController.createMapping
);

export default router;