import { Request, Response } from "express";

import pool from "../config/db";

export const AdminController = {

  /* GET USERS */

  getAllUsers: async (
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
          role_id,
          created_at
        FROM users
        ORDER BY id ASC
        `
      );

      res.status(200).json({
        success: true,
        users: result.rows,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch users",
      });
    }
  },

  /* CREATE USER */

  createUser: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const {
        full_name,
        email,
        password,
        role_id,
      } = req.body;

      const result = await pool.query(
        `
        INSERT INTO users (
          full_name,
          email,
          password,
          role_id
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
          full_name,
          email,
          password,
          role_id,
        ]
      );

      res.status(201).json({
        success: true,
        user: result.rows[0],
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to create user",
      });
    }
  },

  /* UPDATE USER */

  updateUser: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const { id } = req.params;

      const {
        full_name,
        email,
        role_id,
      } = req.body;

      const result = await pool.query(
        `
        UPDATE users
        SET
          full_name = $1,
          email = $2,
          role_id = $3
        WHERE id = $4
        RETURNING *
        `,
        [
          full_name,
          email,
          role_id,
          id,
        ]
      );

      res.status(200).json({
        success: true,
        user: result.rows[0],
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to update user",
      });
    }
  },

  /* DELETE USER */

  deleteUser: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const { id } = req.params;

      await pool.query(
        `
        DELETE FROM users
        WHERE id = $1
        `,
        [id]
      );

      res.status(200).json({
        success: true,
        message:
          "User deleted successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to delete user",
      });
    }
  },

  /* AUDIT LOGS */

  getAuditLogs: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const result = await pool.query(
        `
        SELECT

          audit_logs.id,

          users.full_name,

          audit_logs.action,

          audit_logs.module,

          audit_logs.created_at

        FROM audit_logs

        JOIN users
        ON users.id =
        audit_logs.user_id

        ORDER BY
        audit_logs.created_at DESC
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