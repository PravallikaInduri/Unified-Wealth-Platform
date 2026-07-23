import { Request, Response } from "express";
import { WealthService } from "../services/wealthService";
import pool from "../config/db";

export const DashboardController = {
  getSummary: async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const investorId =
        req.params.investorId as string;

      const equityData =
        await WealthService.getEquityHoldings(
          investorId,
          ""
        );

      const mfData =
        await WealthService.getMFPortfolio(
          investorId
        );

      const equityValue =
        equityData.data.reduce(
          (sum: number, item: any) =>
            sum + Number(item.holding_value),
          0
        );

      const mfValue =
        mfData.data.reduce(
          (sum: number, item: any) =>
            sum + Number(item.investment_value),
          0
        );

      const totalWealth =
        equityValue + mfValue;

      res.status(200).json({
        success: true,
        summary: {
          equityValue,
          mfValue,
          totalWealth,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch dashboard summary",
      });
    }
  },

  getAllocation: async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const investorId =
        req.params.investorId as string;

      const equityData =
        await WealthService.getEquityHoldings(
          investorId,
          ""
        );

      const mfData =
        await WealthService.getMFPortfolio(
          investorId
        );

      const equityValue =
        equityData.data.reduce(
          (sum: number, item: any) =>
            sum + Number(item.holding_value),
          0
        );

      const mfValue =
        mfData.data.reduce(
          (sum: number, item: any) =>
            sum + Number(item.investment_value),
          0
        );

      const total =
        equityValue + mfValue;

      const equityPercentage =
        Number(
          (
            (equityValue / total) *
            100
          ).toFixed(2)
        );

      const mfPercentage =
        Number(
          (
            (mfValue / total) *
            100
          ).toFixed(2)
        );

      res.status(200).json({
        success: true,
        allocation: {
          equityPercentage,
          mfPercentage,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch allocation",
      });
    }
  },

  getRecentTransactions: async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const investorId =
        req.params.investorId as string;

      const equityTransactions =
        await WealthService.getEquityTransactions(
          investorId
        );

      const mfTransactions =
        await WealthService.getMFTransactions(
          investorId
        );

      const formattedEquity =
        equityTransactions.data.map(
          (item: any) => ({
            id: item.id,
            type: "EQUITY",
            asset_name:
              item.symbol,
            amount:
              item.total_amount,
            status:
              item.transaction_type,
            transaction_date:
              item.transaction_date,
          })
        );

      const formattedMF =
        mfTransactions.data.map(
          (item: any) => ({
            id: item.id,
            type: "MF",
            asset_name:
              item.fund_name,
            amount:
              item.amount,
            status: "SUCCESS",
            transaction_date:
              item.transaction_date,
          })
        );

      const transactions = [
        ...formattedEquity,
        ...formattedMF,
      ];

      transactions.sort(
        (a: any, b: any) =>
          new Date(
            b.transaction_date
          ).getTime() -
          new Date(
            a.transaction_date
          ).getTime()
      );

      res.status(200).json({
        success: true,
        transactions,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch transactions",
      });
    }
  },

  getAdminSummary: async (
  req: Request,
  res: Response
): Promise<any> => {

  try {

    const investorsResult =
      await pool.query(`
        SELECT COUNT(*)
        AS total_investors
        FROM users
        WHERE role_id = 4
      `);

    const totalInvestors =
      Number(
        investorsResult.rows[0]
          .total_investors
      );

    res.status(200).json({
      success: true,
      summary: {
        totalInvestors,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch admin summary",
    });
  }
},
};