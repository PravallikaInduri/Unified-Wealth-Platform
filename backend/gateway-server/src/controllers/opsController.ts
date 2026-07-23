import { Request, Response } from "express";
import pool from "../config/db";

export const OpsController = {

  getAuditLogs: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const result = await pool.query(
        `
        SELECT
          id,
          user_id,
          action,
          module,
          created_at
        FROM audit_logs
        ORDER BY created_at DESC
        `
      );

      res.status(200).json({
        success: true,
        logs: result.rows,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch audit logs",
      });
    }
  },
};