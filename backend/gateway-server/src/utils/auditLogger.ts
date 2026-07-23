import pool from "../config/db";

export const createAuditLog = async (
  userId: number,
  action: string,
  module: string
) => {

  try {

    await pool.query(
      `
      INSERT INTO audit_logs (
        user_id,
        action,
        module
      )
      VALUES ($1, $2, $3)
      `,
      [userId, action, module]
    );

  } catch (error) {

    console.log(
      "Audit log failed",
      error
    );
  }
};