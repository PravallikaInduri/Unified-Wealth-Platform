"use client";

import Sidebar from "@/components/admin/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

import {
  FiTrendingUp,
  FiUsers,
  FiActivity,
  FiDollarSign,
} from "react-icons/fi";

const allocationData = [
  {
    name: "Equity",
    value: 78,
  },
  {
    name: "Mutual Funds",
    value: 22,
  },
];

const growthData = [
  {
    month: "Jan",
    investors: 120,
  },
  {
    month: "Feb",
    investors: 180,
  },
  {
    month: "Mar",
    investors: 240,
  },
  {
    month: "Apr",
    investors: 310,
  },
  {
    month: "May",
    investors: 390,
  },
];

const COLORS = [
  "#7C3AED",
  "#22C55E",
];

export default function DashboardPage() {

  const [summary, setSummary] =
    useState({
      totalInvestors: 0,
    });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "accessToken"
          );

        const response =
          await axios.get(
            "http://localhost:5000/dashboard/admin-summary",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setSummary(
          response.data.summary
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

        {/* TOP SECTION */}

        <div className="
          flex
          justify-between
          items-start
          mb-12
        ">

          <div>

            <p className="
              text-sm
              tracking-[4px]
              uppercase
              text-indigo-400
              mb-4
            ">
              Unified Wealth Platform
            </p>

            <h1 className="
              text-6xl
              font-bold
              leading-tight
            ">
              Wealth <br />
              Analytics
            </h1>

          </div>

          <div className="
            w-14
            h-14
            rounded-full
            bg-gradient-to-br
            from-indigo-500
            to-violet-700
            flex
            items-center
            justify-center
            text-xl
            font-bold
          ">
            A
          </div>

        </div>

        {/* ANALYTICS CARDS */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-10
        ">

          {/* CARD */}

          <div className="
            bg-gradient-to-br
            from-indigo-500/20
            to-violet-700/20
            border
            border-white/10
            rounded-[32px]
            p-7
            backdrop-blur-xl
          ">

            <div className="
              flex
              justify-between
              items-start
            ">

              <div>

                <p className="
                  text-gray-400
                  text-sm
                  mb-3
                ">
                  Total AUM
                </p>

                <h2 className="
                  text-4xl
                  font-bold
                ">
                  ₹54K
                </h2>

              </div>

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-white/10
                flex
                items-center
                justify-center
              ">
                <FiDollarSign className="
                  text-2xl
                " />
              </div>

            </div>

          </div>

          {/* CARD */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[32px]
            p-7
            backdrop-blur-xl
          ">

            <div className="
              flex
              justify-between
              items-start
            ">

              <div>

                <p className="
                  text-gray-400
                  text-sm
                  mb-3
                ">
                  Investors
                </p>

                  <h2 className="
                  text-4xl
                  font-bold
                ">
                  {
                    summary.totalInvestors
                  }
                </h2>

              </div>

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-white/10
                flex
                items-center
                justify-center
              ">
                <FiUsers className="
                  text-2xl
                " />
              </div>

            </div>

          </div>

          {/* CARD */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[32px]
            p-7
            backdrop-blur-xl
          ">

            <div className="
              flex
              justify-between
              items-start
            ">

              <div>

                <p className="
                  text-gray-400
                  text-sm
                  mb-3
                ">
                  Active SIPs
                </p>

                <h2 className="
                  text-4xl
                  font-bold
                ">
                  12
                </h2>

              </div>

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-white/10
                flex
                items-center
                justify-center
              ">
                <FiActivity className="
                  text-2xl
                " />
              </div>

            </div>

          </div>

          {/* CARD */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[32px]
            p-7
            backdrop-blur-xl
          ">

            <div className="
              flex
              justify-between
              items-start
            ">

              <div>

                <p className="
                  text-gray-400
                  text-sm
                  mb-3
                ">
                  Platform Growth
                </p>

                <h2 className="
                  text-4xl
                  font-bold
                  text-green-400
                ">
                  +18%
                </h2>

              </div>

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-green-500/10
                flex
                items-center
                justify-center
              ">
                <FiTrendingUp className="
                  text-2xl
                  text-green-400
                " />
              </div>

            </div>

          </div>

        </div>

        {/* CHART SECTION */}

        <div className="
          grid
          grid-cols-1
          xl:grid-cols-[420px_1fr]
          gap-8
          mb-10
        ">

          {/* DONUT CHART */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[36px]
            p-8
            backdrop-blur-xl
          ">

            <div className="
              flex
              justify-between
              items-center
              mb-8
            ">

              <div>

                <h2 className="
                  text-2xl
                  font-bold
                ">
                  Asset Allocation
                </h2>

                <p className="
                  text-gray-400
                  mt-2
                ">
                  Portfolio distribution
                </p>

              </div>

            </div>

            <div className="
              h-[320px]
            ">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={allocationData}
                    dataKey="value"
                    innerRadius={90}
                    outerRadius={120}
                    paddingAngle={5}
                  >

                    {allocationData.map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            <div className="
              flex
              justify-center
              gap-8
              mt-6
            ">

              <div className="
                flex
                items-center
                gap-2
              ">

                <div className="
                  w-3
                  h-3
                  rounded-full
                  bg-violet-500
                " />

                <span className="
                  text-gray-300
                ">
                  Equity
                </span>

              </div>

              <div className="
                flex
                items-center
                gap-2
              ">

                <div className="
                  w-3
                  h-3
                  rounded-full
                  bg-green-500
                " />

                <span className="
                  text-gray-300
                ">
                  Mutual Funds
                </span>

              </div>

            </div>

          </div>

          {/* GROWTH CHART */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[36px]
            p-8
            backdrop-blur-xl
          ">

            <div className="
              mb-8
            ">

              <h2 className="
                text-2xl
                font-bold
              ">
                Investor Growth
              </h2>

              <p className="
                text-gray-400
                mt-2
              ">
                Platform growth analytics
              </p>

            </div>

            <div className="
              h-[360px]
            ">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <AreaChart
                  data={growthData}
                >

                  <defs>

                    <linearGradient
                      id="colorGrowth"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="5%"
                        stopColor="#7C3AED"
                        stopOpacity={0.8}
                      />

                      <stop
                        offset="95%"
                        stopColor="#7C3AED"
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>

                  <XAxis
                    dataKey="month"
                    stroke="#94A3B8"
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="investors"
                    stroke="#8B5CF6"
                    fillOpacity={1}
                    fill="url(#colorGrowth)"
                    strokeWidth={4}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* MARKET INSIGHTS */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-[36px]
          p-8
          backdrop-blur-xl
        ">

          <div className="
            flex
            justify-between
            items-center
            mb-8
          ">

            <div>

              <h2 className="
                text-2xl
                font-bold
              ">
                Market Insights
              </h2>

              <p className="
                text-gray-400
                mt-2
              ">
                Real-time platform overview
              </p>

            </div>

          </div>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          ">

            <div className="
              bg-white/5
              rounded-3xl
              p-6
            ">

              <p className="
                text-gray-400
                mb-3
              ">
                Equity Volume
              </p>

              <h3 className="
                text-3xl
                font-bold
              ">
                ₹2.4M
              </h3>

            </div>

            <div className="
              bg-white/5
              rounded-3xl
              p-6
            ">

              <p className="
                text-gray-400
                mb-3
              ">
                SIP Collections
              </p>

              <h3 className="
                text-3xl
                font-bold
              ">
                ₹1.2M
              </h3>

            </div>

            <div className="
              bg-white/5
              rounded-3xl
              p-6
            ">

              <p className="
                text-gray-400
                mb-3
              ">
                Platform Revenue
              </p>

              <h3 className="
                text-3xl
                font-bold
              ">
                ₹320K
              </h3>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}