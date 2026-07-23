import { Request, Response, NextFunction } from "express";

export const mfAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {

  const apiKey = req.headers["x-api-key"];

  if (apiKey !== process.env.MF_API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized service",
    });
  }

  next();
};