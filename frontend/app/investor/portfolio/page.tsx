"use client";

import { useEffect, useState }
from "react";

import axios from "axios";

import InvestorSidebar
from "@/components/investor/InvestorSidebar";

interface EquityHolding {

  symbol: string;

  quantity: number;

  holding_value: string;
}

interface MutualFund {

  fund_name: string;

  investment_value: string;
}

export default function PortfolioPage() {

  const [equity, setEquity] =
    useState<EquityHolding[]>([]);

  const [mutualFunds, setMutualFunds] =
    useState<MutualFund[]>([]);

  useEffect(() => {

    fetchPortfolio();

  }, []);

  const fetchPortfolio =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "accessToken"
          );

        const investorId = 1;

        const response =
          await axios.get(
            `http://localhost:5000/wealth/holdings/${investorId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setEquity(
          response.data.equity
        );

        setMutualFunds(
          response.data.mutualFunds
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <div className="
      min-h-screen
      bg-[#050816]
      flex
      text-white
    ">

      <InvestorSidebar />

      <main className="
        flex-1
        px-10
        py-8
      ">

        {/* HEADER */}

        <div className="
          mb-10
        ">

          <p className="
            text-sm
            uppercase
            tracking-[4px]
            text-indigo-400
            mb-3
          ">
            Portfolio
          </p>

          <h1 className="
            text-5xl
            font-bold
          ">
            Investment Holdings
          </h1>

        </div>

        {/* EQUITY HOLDINGS */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-[32px]
          overflow-hidden
          mb-10
        ">

          <div className="
            px-8
            py-6
            border-b
            border-white/10
          ">

            <h2 className="
              text-2xl
              font-bold
            ">
              Equity Holdings
            </h2>

          </div>

          <div className="
            grid
            grid-cols-3
            px-8
            py-5
            border-b
            border-white/10
            text-gray-400
            uppercase
            text-sm
          ">

            <div>Symbol</div>
            <div>Quantity</div>
            <div>Holding Value</div>

          </div>

          {equity.map(
            (item, index) => (

              <div
                key={`${item.symbol}-${index}`}
                className="
                  grid
                  grid-cols-3
                  px-8
                  py-6
                  border-b
                  border-white/5
                  hover:bg-white/5
                  transition
                "
              >

                <div className="
                  font-semibold
                ">
                  {item.symbol}
                </div>

                <div>
                  {item.quantity}
                </div>

                <div>
                  ₹
                  {item.holding_value}
                </div>

              </div>
            )
          )}

        </div>

        {/* MUTUAL FUNDS */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-[32px]
          overflow-hidden
        ">

          <div className="
            px-8
            py-6
            border-b
            border-white/10
          ">

            <h2 className="
              text-2xl
              font-bold
            ">
              Mutual Funds
            </h2>

          </div>

          <div className="
            grid
            grid-cols-2
            px-8
            py-5
            border-b
            border-white/10
            text-gray-400
            uppercase
            text-sm
          ">

            <div>Fund Name</div>
            <div>Investment Value</div>

          </div>

          {mutualFunds.map(
            (item, index) => (

              <div
                key={`${item.fund_name}-${index}`}
                className="
                  grid
                  grid-cols-2
                  px-8
                  py-6
                  border-b
                  border-white/5
                  hover:bg-white/5
                  transition
                "
              >

                <div className="
                  font-semibold
                ">
                  {item.fund_name}
                </div>

                <div>
                  ₹
                  {
                    item.investment_value
                  }
                </div>

              </div>
            )
          )}

        </div>

      </main>

    </div>
  );
}