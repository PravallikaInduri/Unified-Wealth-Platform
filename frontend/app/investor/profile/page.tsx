"use client";

import { useEffect, useState }
from "react";

import axios from "axios";

import InvestorSidebar
from "@/components/investor/InvestorSidebar";

interface InvestorProfile {

  full_name: string;

  email: string;

  pan_number: string;

  aadhar_number: string;
}

export default function InvestorProfilePage() {

  const [profile, setProfile] =
    useState<InvestorProfile>({
      full_name: "",
      email: "",
      pan_number: "",
      aadhar_number: "",
    });

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "accessToken"
          );

        const investorId = 1;

        const response =
          await axios.get(
            `http://localhost:5000/investor/profile/${investorId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setProfile(
          response.data.profile
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
            Investor Profile
          </p>

          <h1 className="
            text-5xl
            font-bold
          ">
            Account Details
          </h1>

        </div>

        {/* PROFILE CARD */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-[32px]
          p-10
          max-w-4xl
        ">

          <div className="
            grid
            grid-cols-2
            gap-8
          ">

            {/* FULL NAME */}

            <div>

              <p className="
                text-gray-400
                mb-2
              ">
                Full Name
              </p>

              <h2 className="
                text-2xl
                font-semibold
              ">
                {
                  profile.full_name
                }
              </h2>

            </div>

            {/* EMAIL */}

            <div>

              <p className="
                text-gray-400
                mb-2
              ">
                Email Address
              </p>

              <h2 className="
                text-2xl
                font-semibold
              ">
                {
                  profile.email
                }
              </h2>

            </div>

            {/* PAN */}

            <div>

              <p className="
                text-gray-400
                mb-2
              ">
                PAN Number
              </p>

              <h2 className="
                text-2xl
                font-semibold
              ">
                {
                  profile.pan_number
                }
              </h2>

            </div>

            {/* AADHAR */}

            <div>

              <p className="
                text-gray-400
                mb-2
              ">
                Aadhar Number
              </p>

              <h2 className="
                text-2xl
                font-semibold
              ">
                {
                  profile.aadhar_number
                }
              </h2>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}