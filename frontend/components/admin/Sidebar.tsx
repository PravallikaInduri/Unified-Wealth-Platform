"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  FiHome,
  FiUsers,
  FiLink,
  FiPieChart,
  FiActivity,
  FiSettings,
  FiLogOut,
  FiRepeat,
} from "react-icons/fi";

export default function Sidebar() {

  const router =
    useRouter();

  const handleLogout =
    async () => {

      try {

        const refreshToken =
          localStorage.getItem(
            "refreshToken"
          );

        await axios.post(
          "http://localhost:5000/auth/logout",
          {
            refreshToken,
          }
        );

      } catch (error) {

        console.log(error);

      } finally {

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        router.push("/");
      }
    };

  const menus = [
    {
      title: "Dashboard",
      icon: <FiHome />,
      path: "/admin/dashboard",
    },
    {
      title: "Users",
      icon: <FiUsers />,
      path: "/admin/users",
    },
    {
      title: "Investor Mapping",
      icon: <FiLink />,
      path: "/admin/investor-mapping",
    },
    {
      title: "Asset Management",
      icon: <FiPieChart />,
      path: "/admin/asset-management",
    },
    {
      title: "Transactions",
      icon: <FiRepeat />,
      path: "/admin/transactions",
    },
    {
      title: "Audit Logs",
      icon: <FiActivity />,
      path: "/admin/audit-logs",
    },
    {
      title: "Settings",
      icon: <FiSettings />,
      path: "/admin/settings",
    },
  ];

  return (
    <aside
      className="
        w-[260px]
        bg-white/5
        border-r
        border-white/10
        backdrop-blur-xl
        p-6
        hidden
        md:flex
        flex-col
        justify-between
      "
    >

      <div>

        <h1
          className="
            text-3xl
            font-bold
            text-white
            mb-10
          "
        >
          Unified Wealth
        </h1>

        <nav className="space-y-3">

          {menus.map((menu, index) => (

            <Link
              key={index}
              href={menu.path}
              className="
                flex
                items-center
                gap-3
                p-4
                rounded-2xl
                text-gray-300
                hover:bg-indigo-500/20
                hover:text-white
                transition
              "
            >
              {menu.icon}
              {menu.title}
            </Link>

          ))}

        </nav>

      </div>

      <button
        onClick={handleLogout}
        className="
          flex
          items-center
          gap-3
          bg-red-500/20
          hover:bg-red-500/30
          transition
          p-4
          rounded-2xl
          text-white
        "
      >

        <FiLogOut />

        Logout

      </button>

    </aside>
  );
}