import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const authorizeRoles = (
  ...allowedRoles: number[]
) => {

  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): any => {

    const userRole =
      req.user?.role_id;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};