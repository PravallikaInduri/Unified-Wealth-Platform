"use client";

import { useState }
from "react";

import InvestorSidebar
from "@/components/investor/InvestorSidebar";

export default function InvestorSettingsPage() {

  const [profile, setProfile] =
    useState({
      full_name: "Rahul Investor",
      email: "rahul@gmail.com",
    });

  const [passwords, setPasswords] =
    useState({
      currentPassword: "",
      newPassword: "",
    });

  const handleProfileUpdate = () => {

    alert(
      "Profile updated successfully"
    );
  };

  const handlePasswordUpdate = () => {

    alert(
      "Password updated successfully"
    );
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
            Settings
          </p>

          <h1 className="
            text-5xl
            font-bold
          ">
            Account Settings
          </h1>

        </div>

        {/* SETTINGS GRID */}

        <div className="
          grid
          grid-cols-2
          gap-8
        ">

          {/* PROFILE SETTINGS */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[32px]
            p-8
          ">

            <h2 className="
              text-2xl
              font-bold
              mb-8
            ">
              Profile Settings
            </h2>

            <div className="
              space-y-5
            ">

              {/* NAME */}

              <div>

                <label className="
                  block
                  text-sm
                  text-gray-400
                  mb-2
                ">
                  Full Name
                </label>

                <input
                  type="text"
                  value={
                    profile.full_name
                  }
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      full_name:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="
                  block
                  text-sm
                  text-gray-400
                  mb-2
                ">
                  Email Address
                </label>

                <input
                  type="email"
                  value={
                    profile.email
                  }
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      email:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                />

              </div>

              {/* BUTTON */}

              <button
                onClick={
                  handleProfileUpdate
                }
                className="
                  bg-gradient-to-r
                  from-indigo-500
                  to-violet-600
                  px-6
                  py-3
                  rounded-2xl
                  font-semibold
                "
              >

                Save Changes

              </button>

            </div>

          </div>

          {/* PASSWORD */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[32px]
            p-8
          ">

            <h2 className="
              text-2xl
              font-bold
              mb-8
            ">
              Update Password
            </h2>

            <div className="
              space-y-5
            ">

              {/* CURRENT PASSWORD */}

              <div>

                <label className="
                  block
                  text-sm
                  text-gray-400
                  mb-2
                ">
                  Current Password
                </label>

                <input
                  type="password"
                  value={
                    passwords
                      .currentPassword
                  }
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      currentPassword:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                />

              </div>

              {/* NEW PASSWORD */}

              <div>

                <label className="
                  block
                  text-sm
                  text-gray-400
                  mb-2
                ">
                  New Password
                </label>

                <input
                  type="password"
                  value={
                    passwords
                      .newPassword
                  }
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      newPassword:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                />

              </div>

              {/* BUTTON */}

              <button
                onClick={
                  handlePasswordUpdate
                }
                className="
                  bg-gradient-to-r
                  from-indigo-500
                  to-violet-600
                  px-6
                  py-3
                  rounded-2xl
                  font-semibold
                "
              >

                Update Password

              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}