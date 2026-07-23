import pool from "../config/db";

export interface User {
  id: number;
  full_name: string;
  email: string;
  password: string;
  role_id: number;
}

export const AuthModel = {
  findUserByEmail: async (
    email: string
  ): Promise<User | null> => {

    const result = await pool.query(
      `
      SELECT
        id,
        full_name,
        email,
        password,
        role_id
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    return result.rows[0] || null;
  },
};