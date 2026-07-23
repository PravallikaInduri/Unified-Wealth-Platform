import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import pool from "../config/db";
import { AuthModel } from "../models/authModel";
import { createAuditLog } from "../utils/auditLogger";
export const AuthController = {

  login: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const { email, password } = req.body;

      const user =
        await AuthModel.findUserByEmail(
          email
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.password !== password) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role_id: user.role_id,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      const refreshToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.REFRESH_SECRET as string,
        {
          expiresIn: "7d",
        }
      );

      await pool.query(
        `
        INSERT INTO refresh_tokens (
          user_id,
          refresh_token
        )
        VALUES ($1, $2)
        `,
        [user.id, refreshToken]
      );

      await createAuditLog(
  user.id,
  "LOGIN",
  "AUTH"
);

res.status(200).json({
  success: true,

  accessToken,

  refreshToken,

  user: {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    role_id: user.role_id,
  },
});
    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Login failed",
      });
    }
  },

  refreshToken: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const { refreshToken } =
        req.body;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Refresh token missing",
        });
      }

      const decoded: any =
        jwt.verify(
          refreshToken,
          process.env.REFRESH_SECRET as string
        );

      const result = await pool.query(
        `
        SELECT *
        FROM refresh_tokens
        WHERE refresh_token = $1
        `,
        [refreshToken]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid refresh token",
        });
      }

      const newAccessToken = jwt.sign(
        {
          id: decoded.id,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({

        success: true,
        accessToken: newAccessToken,
      });

    } catch (error) {

      console.log(error);

      res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
  },
  logout: async (
  req: Request,
  res: Response
): Promise<any> => {

  try {

    const { refreshToken } =
      req.body;

    await pool.query(
      `
      DELETE FROM refresh_tokens
      WHERE refresh_token = $1
      `,
      [refreshToken]
    );

    const decoded: any =
  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET as string
  );

await createAuditLog(
  decoded.id,
  "LOGOUT",
  "AUTH"
);

res.status(200).json({
  success: true,
  message: "Logged out successfully",
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
},
};