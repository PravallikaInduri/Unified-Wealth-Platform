import axios from "axios";

export const WealthService = {

  getEquityHoldings: async (
    investorId: string,
    token: string
  ) => {

    const response = await axios.get(
      `http://localhost:5001/equity/holdings/${investorId}`,
      {
        headers: {
          "x-service-secret":
            process.env.SERVICE_SECRET,
        },
      }
    );

    return response.data;
  },

  getMFPortfolio: async (
    investorId: string
  ) => {

    const response = await axios.get(
      `http://localhost:5002/mf/portfolio/${investorId}`,
      {
        headers: {
          "x-api-key":
            process.env.MF_API_KEY,
        },
      }
    );

    return response.data;
  },

  getEquityTransactions: async (
    investorId: string
  ) => {

    const response = await axios.get(
      `http://localhost:5001/equity/transactions/${investorId}`,
      {
        headers: {
          "x-service-secret":
            process.env.SERVICE_SECRET,
        },
      }
    );

    return response.data;
  },

  getMFTransactions: async (
    investorId: string
  ) => {

    const response = await axios.get(
      `http://localhost:5002/mf/transactions/${investorId}`,
      {
        headers: {
          "x-api-key":
            process.env.MF_API_KEY,
        },
      }
    );

    return response.data;
  },
};