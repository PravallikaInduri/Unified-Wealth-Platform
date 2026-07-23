"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "@/components/admin/Sidebar";

interface EquityHolding {
  symbol: string;
  quantity: number;
  holding_value: string;
}

interface MutualFund {
  fund_name: string;
  investment_value: string;
}

export default function AssetManagementPage() {

  const [equity, setEquity] =
    useState<EquityHolding[]>([]);

  const [mutualFunds, setMutualFunds] =
    useState<MutualFund[]>([]);

  const [summary, setSummary] =
    useState({
      equityValue: 0,
      mfValue: 0,
      totalWealth: 0,
    });

  useEffect(() => {

    fetchAssets();

  }, []);

  const fetchAssets = async () => {

    try {

      const token =
        localStorage.getItem(
          "accessToken"
        );

      const investorId = 1;

      /* HOLDINGS */

      const holdingsResponse =
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
        holdingsResponse.data.equity
      );

      setMutualFunds(
        holdingsResponse.data.mutualFunds
      );

      /* SUMMARY */

      const summaryResponse =
        await axios.get(
          `http://localhost:5000/dashboard/summary/${investorId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setSummary(
        summaryResponse.data.summary
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

      <Sidebar />

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
            Asset Management
          </p>

          <h1 className="
            text-5xl
            font-bold
          ">
            Wealth Assets
          </h1>

        </div>

        {/* SUMMARY CARDS */}

        <div className="
          grid
          grid-cols-3
          gap-6
          mb-10
        ">

          {/* TOTAL WEALTH */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[28px]
            p-6
          ">

            <p className="
              text-gray-400
              mb-4
            ">
              Total Wealth
            </p>

            <h2 className="
              text-4xl
              font-bold
            ">
              ₹
              {
                summary.totalWealth
              }
            </h2>

          </div>

          {/* EQUITY */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[28px]
            p-6
          ">

            <p className="
              text-gray-400
              mb-4
            ">
              Equity Value
            </p>

            <h2 className="
              text-4xl
              font-bold
            ">
              ₹
              {
                summary.equityValue
              }
            </h2>

          </div>

          {/* MF */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[28px]
            p-6
          ">

            <p className="
              text-gray-400
              mb-4
            ">
              Mutual Funds
            </p>

            <h2 className="
              text-4xl
              font-bold
            ">
              ₹
              {
                summary.mfValue
              }
            </h2>

          </div>

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

          {equity.map((item, index) => (

            <div
              key={index}
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
          ))}

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

          {mutualFunds.map((item, index) => (

            <div
              key={index}
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
          ))}

        </div>

      </main>

    </div>
  );
}