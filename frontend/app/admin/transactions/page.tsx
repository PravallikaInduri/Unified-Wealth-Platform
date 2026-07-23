"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "@/components/admin/Sidebar";

interface Transaction {

  id: number;

  type: string;

  asset_name: string;

  amount: string;

  status: string;

  transaction_date: string;
}

export default function TransactionsPage() {

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  useEffect(() => {

    fetchTransactions();

  }, []);

  const fetchTransactions =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "accessToken"
          );

        const investorId = 1;

        const response =
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
          response.data.transactions
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
            Transactions
          </p>

          <h1 className="
            text-5xl
            font-bold
          ">
            Investment Activity
          </h1>

        </div>

        {/* TABLE */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-[32px]
          overflow-hidden
        ">

          {/* TABLE HEADER */}

          <div className="
            grid
            grid-cols-5
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
            <div>Status</div>
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
                  grid-cols-5
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

                <div className="
                  font-semibold
                ">

                  ₹
                  {
                    transaction.amount
                  }

                </div>

                {/* STATUS */}

                <div>

                  <span className={`
                    font-semibold
                    ${
                      transaction.status
                      === "SUCCESS"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  `}>

                    {
                      transaction.status
                    }

                  </span>

                </div>

                {/* DATE */}

                <div className="
                  text-gray-400
                ">

                  {
                    transaction.transaction_date
                      ? new Date(
                          transaction.transaction_date
                        ).toLocaleDateString()
                      : "N/A"
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