import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

export const hmacAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {

  const apiKey = req.headers["x-api-key"];
  const signature = req.headers["x-signature"];

  if (apiKey !== process.env.MF_API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Invalid API key",
    });
  }

  const data =
    req.originalUrl + req.method;

  const generatedSignature =
    crypto
      .createHmac(
        "sha256",
        process.env.MF_SECRET as string
      )
      .update(data)
      .digest("hex");

  if (signature !== generatedSignature) {
    return res.status(401).json({
      success: false,
      message: "Invalid signature",
    });
  }

  next();
};