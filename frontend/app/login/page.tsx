"use client";

import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  FiMail,
  FiLock
} from "react-icons/fi";

import {
  useRouter
} from "next/navigation";

export default function LoginPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async () => {

      try {

        const response =
          await axios.post(
            "http://localhost:5000/auth/login",
            {
              email,
              password,
            }
          );

        /* STORE TOKENS */

        localStorage.setItem(
          "accessToken",
          response.data.accessToken
        );

        localStorage.setItem(
          "refreshToken",
          response.data.refreshToken
        );

        /* ROLE */

        const roleId =
          response.data.user.role_id;

        /* ADMIN */

        if (roleId === 1) {

          router.push(
            "/admin/dashboard"
          );
        }

        /* OPS */

        else if (roleId === 2) {

          router.push(
            "/ops/dashboard"
          );
        }

        /* RM */

        else if (roleId === 3) {

          router.push(
            "/rm/dashboard"
          );
        }

        /* INVESTOR */

        else if (roleId === 4) {

          router.push(
            "/investor/dashboard"
          );
        }

      } catch (error) {

        console.log(error);

        alert("Login Failed");
      }
    };

  return (
    <div className="
      min-h-screen
      bg-black
      flex
      items-center
      justify-center
      p-4
    ">

      <motion.div
        initial={{
          opacity: 0,
          y: 40
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}
        className="
          w-full
          max-w-md
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          p-8
          shadow-2xl
        "
      >

        {/* TITLE */}

        <h1 className="
          text-4xl
          font-bold
          text-white
          text-center
          mb-2
        ">

          Unified Wealth

        </h1>

        <p className="
          text-gray-300
          text-center
          mb-8
        ">

          Premium Wealth Platform

        </p>

        {/* FORM */}

        <div className="
          space-y-5
        ">

          {/* EMAIL */}

          <div className="
            flex
            items-center
            bg-white/10
            rounded-2xl
            px-4
            py-3
          ">

            <FiMail className="
              text-white
              text-xl
              mr-3
            " />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                bg-transparent
                outline-none
                text-white
                w-full
              "
            />

          </div>

          {/* PASSWORD */}

          <div className="
            flex
            items-center
            bg-white/10
            rounded-2xl
            px-4
            py-3
          ">

            <FiLock className="
              text-white
              text-xl
              mr-3
            " />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                bg-transparent
                outline-none
                text-white
                w-full
              "
            />

          </div>

          {/* BUTTON */}

          <button
            onClick={
              handleLogin
            }
            className="
              w-full
              bg-white
              text-black
              font-semibold
              py-3
              rounded-2xl
              hover:scale-105
              transition
              duration-300
            "
          >

            Login

          </button>

        </div>

      </motion.div>

    </div>
  );
}