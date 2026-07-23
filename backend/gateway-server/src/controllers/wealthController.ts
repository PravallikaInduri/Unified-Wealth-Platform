import { Request, Response } from "express";

import { WealthService }
from "../services/wealthService";

export const WealthController = {

  /* WEALTH SUMMARY */

  getWealthSummary: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const investorId =
        req.params
          .investorId as string;

      const equityData =
        await WealthService
          .getEquityHoldings(
            investorId,
            ""
          );

      const mfData =
        await WealthService
          .getMFPortfolio(
            investorId
          );

      let equityValue = 0;

      let mfValue = 0;

      /* EQUITY TOTAL */

      if (
        equityData?.data
      ) {

        equityData.data
          .forEach(
            (item: any) => {

              equityValue +=
                Number(
                  item.holding_value
                );
            }
          );
      }

      /* MF TOTAL */

      if (
        mfData?.data
      ) {

        mfData.data
          .forEach(
            (item: any) => {

              mfValue +=
                Number(
                  item.investment_value
                );
            }
          );
      }

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
          "Failed to fetch wealth summary",

      });
    }
  },

  /* HOLDINGS */

  getHoldings: async (
    req: Request,
    res: Response
  ): Promise<any> => {

    try {

      const investorId =
        req.params
          .investorId as string;

      const equityData =
        await WealthService
          .getEquityHoldings(
            investorId,
            ""
          );

      const mfData =
        await WealthService
          .getMFPortfolio(
            investorId
          );

      res.status(200).json({

        success: true,

        equity:
          equityData.data,

        mutualFunds:
          mfData.data,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch holdings",

      });
    }
  },
};