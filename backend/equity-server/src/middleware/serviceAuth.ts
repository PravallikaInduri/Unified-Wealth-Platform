import {
  Request,
  Response,
  NextFunction
} from "express";

export const serviceAuth = (

  req: Request,

  res: Response,

  next: NextFunction

): any => {

  const serviceSecret =
    req.headers["x-service-secret"];

  if (
    serviceSecret !==
    process.env.SERVICE_SECRET
  ) {

    return res.status(401).json({

      success: false,

      message: "Unauthorized service"
    });
  }

  next();
};