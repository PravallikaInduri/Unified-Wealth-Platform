import pool from "../config/db";

export interface MFPortfolio {
  fund_name: string;
  units: number;
  nav: number;
  investment_value: number;
}

export interface SIP {
  fund_name: string;
  sip_amount: number;
  sip_date: number;
  status: string;
}

export interface MFTransaction {
  fund_name: string;
  transaction_type: string;
  amount: number;
  transaction_date: Date;
}

export interface NAVHistory {
  fund_name: string;
  nav: number;
  nav_date: Date;
}

export const MFModel = {
  getPortfolioByInvestor: async (
    investorId: string
  ): Promise<MFPortfolio[]> => {

    const result = await pool.query(
      `
      SELECT
        fund_name,
        units,
        nav,
        (units * nav) AS investment_value
      FROM mf_investments
      WHERE investor_id = $1
      `,
      [investorId]
    );

    return result.rows;
  },

  getSIPsByInvestor: async (
    investorId: string
  ): Promise<SIP[]> => {

    const result = await pool.query(
      `
      SELECT
        fund_name,
        sip_amount,
        sip_date,
        status
      FROM sip_accounts
      WHERE investor_id = $1
      `,
      [investorId]
    );

    return result.rows;
  },

  getTransactionsByInvestor: async (
    investorId: string
  ): Promise<MFTransaction[]> => {

    const result = await pool.query(
      `
      SELECT
        fund_name,
        transaction_type,
        amount,
        transaction_date
      FROM mf_transactions
      WHERE investor_id = $1
      ORDER BY transaction_date DESC
      `,
      [investorId]
    );

    return result.rows;
  },

  getNAVHistory: async (
    fundName: string
  ): Promise<NAVHistory[]> => {

    const result = await pool.query(
      `
      SELECT
        fund_name,
        nav,
        nav_date
      FROM nav_history
      WHERE fund_name = $1
      ORDER BY nav_date DESC
      `,
      [fundName]
    );

    return result.rows;
  },
};