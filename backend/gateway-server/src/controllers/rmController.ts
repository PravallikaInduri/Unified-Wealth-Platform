import { Request, Response } from "express";
import pool from "../config/db";

export const RMController = {

  getAllInvestors: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const result = await pool.query(
        `
        SELECT
          id,
          full_name,
          email,
          created_at
        FROM users
        WHERE role_id = 2
        ORDER BY id ASC
        `
      );

      res.status(200).json({
        success: true,
        investors: result.rows,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch investors",
      });
    }
  },
};