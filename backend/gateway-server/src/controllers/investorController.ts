import { Request, Response } from "express";
import pool from "../config/db";

export const InvestorController = {

  getProfile: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const investorId =
        req.params.investorId;

      const result = await pool.query(
        `
        SELECT
          id,
          full_name,
          email,
          role_id,
          created_at
        FROM users
        WHERE id = $1
        `,
        [investorId]
      );

      res.status(200).json({
        success: true,
        profile: result.rows[0],
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch profile",
      });
    }
  },
};