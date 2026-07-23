import { Request, Response } from "express";

import pool from "../config/db";

export const MappingController = {

  getMappings: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const result = await pool.query(
        `
        SELECT *
        FROM investor_mapping
        ORDER BY id ASC
        `
      );

      res.status(200).json({
        success: true,
        mappings: result.rows,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch mappings",
      });
    }
  },

  createMapping: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const {
        investor_id,
        investor_name,
        pan_number,
        aadhaar_number,
        equity_investor_id,
        mf_investor_id,
        rm_id,
      } = req.body;

      const result = await pool.query(
        `
        INSERT INTO investor_mapping (

          investor_id,
          investor_name,
          pan_number,
          aadhaar_number,
          equity_investor_id,
          mf_investor_id,
          rm_id

        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        [
          investor_id,
          investor_name,
          pan_number,
          aadhaar_number,
          equity_investor_id,
          mf_investor_id,
          rm_id,
        ]
      );

      res.status(201).json({
        success: true,
        mapping: result.rows[0],
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to create mapping",
      });
    }
  },
};