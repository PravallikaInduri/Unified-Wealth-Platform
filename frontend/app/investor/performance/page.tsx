"use client";

import { useEffect, useState }
from "react";

import axios from "axios";

import InvestorSidebar
from "@/components/investor/InvestorSidebar";

export default function PerformancePage() {

  const [summary, setSummary] =
    useState({
      equityValue: 0,
      mfValue: 0,
      totalWealth: 0,
    });

  const [allocation, setAllocation] =
    useState({
      equityPercentage: 0,
      mfPercentage: 0,
    });

  useEffect(() => {

    fetchPerformance();

  }, []);

  const fetchPerformance =
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

        /* ALLOCATION */

        const allocationResponse =
          await axios.get(
            `http://localhost:5000/dashboard/allocation/${investorId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setAllocation(
          allocationResponse
            .data.allocation
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
            Performance
          </p>

          <h1 className="
            text-5xl
            font-bold
          ">
            Portfolio Analytics
          </h1>

        </div>

        {/* TOP CARDS */}

        <div className="
          grid
          grid-cols-3
          gap-6
          mb-10
        ">

          {/* TOTAL */}

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

        {/* ALLOCATION */}

        <div className="
          grid
          grid-cols-2
          gap-8
        ">

          {/* EQUITY */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[32px]
            p-10
          ">

            <p className="
              text-gray-400
              mb-4
            ">
              Equity Allocation
            </p>

            <h2 className="
              text-6xl
              font-bold
              text-indigo-400
            ">
              {
                allocation
                  .equityPercentage
              }%
            </h2>

          </div>

          {/* MF */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[32px]
            p-10
          ">

            <p className="
              text-gray-400
              mb-4
            ">
              Mutual Fund Allocation
            </p>

            <h2 className="
              text-6xl
              font-bold
              text-green-400
            ">
              {
                allocation
                  .mfPercentage
              }%
            </h2>

          </div>

        </div>

      </main>

    </div>
  );
}