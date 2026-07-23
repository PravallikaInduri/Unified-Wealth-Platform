import { Request, Response } from "express";
import { EquityModel } from "../models/equityModel";

export const EquityController = {
  getHoldings: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {
      const investorId =
        req.params.investorId as string;

      const holdings =
        await EquityModel.getHoldingsByInvestor(
          investorId
        );

      res.status(200).json({
        success: true,
        count: holdings.length,
        data: holdings,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch holdings",
      });
    }
  },

  getTransactions: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {
      const investorId =
        req.params.investorId as string;

      const transactions =
        await EquityModel.getTransactionsByInvestor(
          investorId
        );

      res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch transactions",
      });
    }
  },
};