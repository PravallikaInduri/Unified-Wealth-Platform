"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "@/components/admin/Sidebar";

interface AuditLog {

  id: number;

  full_name: string;

  action: string;

  module: string;

  created_at: string;
}

export default function AuditLogsPage() {

  const [logs, setLogs] =
    useState<AuditLog[]>([]);

  useEffect(() => {

    fetchLogs();

  }, []);

  const fetchLogs =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "accessToken"
          );

        const response =
          await axios.get(
            "http://localhost:5000/admin/audit-logs",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setLogs(
          response.data.logs
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
            Audit Logs
          </p>

          <h1 className="
            text-5xl
            font-bold
          ">
            System Activity
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

          {/* HEADER */}

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

            <div>User</div>
            <div>Action</div>
            <div>Module</div>
            <div>Timestamp</div>

          </div>

          {/* ROWS */}

          {logs.map(
            (log, index) => (

              <div
                key={`${log.id}-${index}`}
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

                {/* USER */}

                <div className="
                  font-semibold
                ">

                  {
                    log.full_name
                  }

                </div>

                {/* ACTION */}

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
                      log.action
                    }

                  </span>

                </div>

                {/* MODULE */}

                <div>

                  {
                    log.module
                  }

                </div>

                {/* DATE */}

                <div className="
                  text-gray-400
                ">

                  {
                    new Date(
                      log.created_at
                    ).toLocaleString()
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