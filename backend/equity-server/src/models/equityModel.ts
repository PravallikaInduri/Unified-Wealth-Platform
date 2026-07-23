import pool from "../config/db";

export interface EquityHolding {
  symbol: string;
  quantity: number;
  average_price: number;
  current_market_price: number;
  holding_value: number;
}

export interface EquityTransaction {
  symbol: string;
  transaction_type: string;
  quantity: number;
  price: number;
  total_amount: number;
  transaction_date: Date;
}

export const EquityModel = {
  getHoldingsByInvestor: async (
    investorId: string
  ): Promise<EquityHolding[]> => {

    const result = await pool.query(
      `
      SELECT
        symbol,
        quantity,
        average_price,
        current_market_price,
        (quantity * current_market_price) AS holding_value
      FROM equity_holdings
      WHERE investor_id = $1
      `,
      [investorId]
    );

    return result.rows;
  },

  getTransactionsByInvestor: async (
    investorId: string
  ): Promise<EquityTransaction[]> => {

    const result = await pool.query(
      `
      SELECT
        symbol,
        transaction_type,
        quantity,
        price,
        total_amount,
        transaction_date
      FROM equity_transactions
      WHERE investor_id = $1
      ORDER BY transaction_date DESC
      `,
      [investorId]
    );

    return result.rows;
  },
};