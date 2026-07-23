import { Request, Response } from "express";
import { MFModel } from "../models/mfModel";

export const MFController = {
  getPortfolio: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {
      const investorId =
        req.params.investorId as string;

      const portfolio =
        await MFModel.getPortfolioByInvestor(
          investorId
        );

      res.status(200).json({
        success: true,
        count: portfolio.length,
        data: portfolio,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch portfolio",
      });
    }
  },

  getSIPs: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {
      const investorId =
        req.params.investorId as string;

      const sips =
        await MFModel.getSIPsByInvestor(
          investorId
        );

      res.status(200).json({
        success: true,
        count: sips.length,
        data: sips,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch SIPs",
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
        await MFModel.getTransactionsByInvestor(
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

  getNAVHistory: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {
      const fundName =
        req.params.fundName as string;

      const navHistory =
        await MFModel.getNAVHistory(
          fundName
        );

      res.status(200).json({
        success: true,
        count: navHistory.length,
        data: navHistory,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch NAV history",
      });
    }
  },
};