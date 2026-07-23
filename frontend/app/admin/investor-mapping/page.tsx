"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "@/components/admin/Sidebar";

import {
  FiSearch,
  FiPlus,
  FiX,
} from "react-icons/fi";

interface Mapping {
  id: number;
  investor_id: string;
  investor_name: string;
  pan_number: string;
  aadhaar_number: string;
  equity_investor_id: string;
  mf_investor_id: string;
  rm_id: number;
}

export default function InvestorMappingPage() {

  const [mappings, setMappings] =
    useState<Mapping[]>([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      investor_id: "",
      investor_name: "",
      pan_number: "",
      aadhaar_number: "",
      equity_investor_id: "",
      mf_investor_id: "",
      rm_id: "",
    });

  useEffect(() => {

    fetchMappings();

  }, []);

  const fetchMappings =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "accessToken"
          );

        const response =
          await axios.get(
            "http://localhost:5000/mapping",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setMappings(
          response.data.mappings
        );

      } catch (error) {

        console.log(error);
      }
    };

  const handleCreateMapping =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "accessToken"
          );

        await axios.post(
          "http://localhost:5000/mapping",
          {
            ...formData,
            rm_id:
              Number(
                formData.rm_id
              ),
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setShowModal(false);

        setFormData({
          investor_id: "",
          investor_name: "",
          pan_number: "",
          aadhaar_number: "",
          equity_investor_id: "",
          mf_investor_id: "",
          rm_id: "",
        });

        fetchMappings();

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  const filteredMappings =
    mappings.filter((mapping) =>
      mapping.pan_number
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

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
          flex
          justify-between
          items-center
          mb-10
        ">

          <div>

            <p className="
              text-sm
              uppercase
              tracking-[4px]
              text-indigo-400
              mb-3
            ">
              Investor Mapping
            </p>

            <h1 className="
              text-5xl
              font-bold
            ">
              Identity Orchestration
            </h1>

          </div>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="
              flex
              items-center
              gap-2
              bg-gradient-to-r
              from-indigo-500
              to-violet-600
              px-6
              py-3
              rounded-2xl
              font-semibold
              hover:scale-105
              transition
            "
          >

            <FiPlus />

            Add Mapping

          </button>

        </div>

        {/* SEARCH */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-5
          flex
          items-center
          gap-4
          mb-8
        ">

          <FiSearch className="
            text-xl
            text-gray-400
          " />

          <input
            type="text"
            placeholder="Search by PAN..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              bg-transparent
              outline-none
              w-full
              text-white
            "
          />

        </div>

        {/* TABLE */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-[32px]
          overflow-hidden
          backdrop-blur-xl
        ">

          {/* TABLE HEADER */}

          <div className="
            grid
            grid-cols-7
            px-8
            py-5
            border-b
            border-white/10
            text-gray-400
            text-sm
            uppercase
          ">

            <div>Investor</div>
            <div>PAN</div>
            <div>Aadhaar</div>
            <div>Investor ID</div>
            <div>Equity ID</div>
            <div>MF ID</div>
            <div>RM</div>

          </div>

          {/* TABLE BODY */}

          {filteredMappings.map(
            (mapping) => (

              <div
                key={mapping.id}
                className="
                  grid
                  grid-cols-7
                  px-8
                  py-6
                  border-b
                  border-white/5
                  items-center
                  hover:bg-white/5
                  transition
                "
              >

                <div>

                  <p className="
                    font-semibold
                  ">
                    {
                      mapping.investor_name
                    }
                  </p>

                </div>

                <div>
                  {
                    mapping.pan_number
                  }
                </div>

                <div>
                  {
                    mapping.aadhaar_number
                  }
                </div>

                <div>

                  <span className="
                    px-3
                    py-2
                    rounded-xl
                    bg-indigo-500/20
                    text-indigo-300
                    text-sm
                  ">
                    {
                      mapping.investor_id
                    }
                  </span>

                </div>

                <div>

                  <span className="
                    px-3
                    py-2
                    rounded-xl
                    bg-green-500/20
                    text-green-300
                    text-sm
                  ">
                    {
                      mapping.equity_investor_id
                    }
                  </span>

                </div>

                <div>

                  <span className="
                    px-3
                    py-2
                    rounded-xl
                    bg-pink-500/20
                    text-pink-300
                    text-sm
                  ">
                    {
                      mapping.mf_investor_id
                    }
                  </span>

                </div>

                <div>
                  RM-
                  {mapping.rm_id}
                </div>

              </div>
            )
          )}

        </div>

      </main>

      {/* MODAL */}

      {showModal && (

        <div className="
          fixed
          inset-0
          bg-black/70
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-50
        ">

          <div className="
            w-full
            max-w-2xl
            bg-[#0B1120]
            border
            border-white/10
            rounded-[32px]
            p-8
          ">

            {/* TOP */}

            <div className="
              flex
              justify-between
              items-center
              mb-8
            ">

              <div>

                <h2 className="
                  text-3xl
                  font-bold
                ">
                  Create Mapping
                </h2>

                <p className="
                  text-gray-400
                  mt-2
                ">
                  Investor identity linking
                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white/5
                  flex
                  items-center
                  justify-center
                "
              >

                <FiX />

              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleCreateMapping
              }
              className="
                grid
                grid-cols-2
                gap-5
              "
            >

              <input
                type="text"
                placeholder="Investor ID"
                value={
                  formData.investor_id
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    investor_id:
                      e.target.value,
                  })
                }
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                "
                required
              />

              <input
                type="text"
                placeholder="Investor Name"
                value={
                  formData.investor_name
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    investor_name:
                      e.target.value,
                  })
                }
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                "
                required
              />

              <input
                type="text"
                placeholder="PAN Number"
                value={
                  formData.pan_number
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pan_number:
                      e.target.value,
                  })
                }
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                "
                required
              />

              <input
                type="text"
                placeholder="Aadhaar Number"
                value={
                  formData.aadhaar_number
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    aadhaar_number:
                      e.target.value,
                  })
                }
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                "
              />

              <input
                type="text"
                placeholder="Equity ID"
                value={
                  formData.equity_investor_id
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    equity_investor_id:
                      e.target.value,
                  })
                }
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                "
                required
              />

              <input
                type="text"
                placeholder="MF ID"
                value={
                  formData.mf_investor_id
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mf_investor_id:
                      e.target.value,
                  })
                }
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                "
                required
              />

              <input
                type="number"
                placeholder="RM ID"
                value={
                  formData.rm_id
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rm_id:
                      e.target.value,
                  })
                }
                className="
                  col-span-2
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                "
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  col-span-2
                  bg-gradient-to-r
                  from-indigo-500
                  to-violet-600
                  py-4
                  rounded-2xl
                  font-semibold
                  text-lg
                "
              >

                {
                  loading
                    ? "Creating..."
                    : "Create Mapping"
                }

              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}