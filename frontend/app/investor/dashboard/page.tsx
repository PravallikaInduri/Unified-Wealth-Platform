"use client";

import { useEffect, useState }
from "react";

import axios from "axios";

import InvestorSidebar
from "@/components/investor/InvestorSidebar";

interface Summary {

  equityValue: number;

  mfValue: number;

  totalWealth: number;
}

interface Transaction {

  id: number;

  type: string;

  asset_name: string;

  amount: string;

  transaction_date: string;
}

export default function InvestorDashboard() {

  const [summary, setSummary] =
    useState<Summary>({
      equityValue: 0,
      mfValue: 0,
      totalWealth: 0,
    });

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "accessToken"
          );

        const investorId = 1;

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

        /* TRANSACTIONS */

        const transactionResponse =
          await axios.get(
            `http://localhost:5000/dashboard/transactions/${investorId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setTransactions(
          transactionResponse
            .data.transactions
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
            Investor Dashboard
          </p>

          <h1 className="
            text-5xl
            font-bold
          ">
            Portfolio Overview
          </h1>

        </div>

        {/* TOP CARDS */}

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
            rounded-[32px]
            p-8
          ">

            <p className="
              text-gray-400
              mb-4
            ">
              Total Portfolio
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
            rounded-[32px]
            p-8
          ">

            <p className="
              text-gray-400
              mb-4
            ">
              Equity Holdings
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
            rounded-[32px]
            p-8
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

        {/* RECENT TRANSACTIONS */}

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
              Recent Transactions
            </h2>

          </div>

          {/* TABLE HEADER */}

          <div className="
            grid
            grid-cols-4
            px-8
            py-5
            border-b
            border-white/10
            text-gray-400
            uppercase
            text-sm
          ">

            <div>Type</div>
            <div>Asset</div>
            <div>Amount</div>
            <div>Date</div>

          </div>

          {/* TABLE ROWS */}

          {transactions.map(
            (
              transaction,
              index
            ) => (

              <div
                key={`${transaction.id}-${index}`}
                className="
                  grid
                  grid-cols-4
                  px-8
                  py-6
                  border-b
                  border-white/5
                  items-center
                  hover:bg-white/5
                  transition
                "
              >

                {/* TYPE */}

                <div>

                  <span className="
                    px-4
                    py-2
                    rounded-full
                    bg-indigo-500/20
                    text-indigo-300
                    text-sm
                  ">

                    {
                      transaction.type
                    }

                  </span>

                </div>

                {/* ASSET */}

                <div className="
                  font-semibold
                ">

                  {
                    transaction.asset_name
                  }

                </div>

                {/* AMOUNT */}

                <div>

                  ₹
                  {
                    transaction.amount
                  }

                </div>

                {/* DATE */}

                <div className="
                  text-gray-400
                ">

                  {
                    new Date(
                      transaction.transaction_date
                    ).toLocaleDateString()
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