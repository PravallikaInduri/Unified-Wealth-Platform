"use client";
import Link from "next/link";
import axios from "axios";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  LayoutDashboard,
  PieChart,
  ArrowLeftRight,
  TrendingUp,
  Settings,
  User,
  LogOut,
} from "lucide-react";

const menuItems = [

  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/investor/dashboard",
  },

  {
    name: "Portfolio",
    icon: PieChart,
    path: "/investor/portfolio",
  },

  {
    name: "Transactions",
    icon: ArrowLeftRight,
    path: "/investor/transactions",
  },

  {
    name: "Performance",
    icon: TrendingUp,
    path: "/investor/performance",
  },

  {
    name: "Profile",
    icon: User,
    path: "/investor/profile",
  },

  {
    name: "Settings",
    icon: Settings,
    path: "/investor/settings",
  },
];

export default function InvestorSidebar() {

  const pathname =
    usePathname();

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

  return (
    <aside className="
      w-[280px]
      min-h-screen
      bg-[#0B1120]
      border-r
      border-white/10
      flex
      flex-col
      justify-between
      px-6
      py-8
    ">

      <div>

        <div className="
          mb-14
        ">

          <h1 className="
            text-5xl
            font-bold
            text-white
          ">
            Unified Wealth
          </h1>

        </div>

        <nav className="
          flex
          flex-col
          gap-3
        ">

          {menuItems.map(
            (item) => {

              const Icon =
                item.icon;

              const isActive =
                pathname ===
                item.path;

              return (

                <Link
                  key={item.name}
                  href={item.path}
                  className={`
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    rounded-2xl
                    transition
                    ${
                      isActive
                        ? `
                          bg-indigo-500/20
                          text-white
                          border
                          border-indigo-500/30
                        `
                        : `
                          text-gray-400
                          hover:bg-white/5
                          hover:text-white
                        `
                    }
                  `}
                >

                  <Icon
                    size={22}
                  />

                  <span className="
                    text-lg
                    font-medium
                  ">
                    {item.name}
                  </span>

                </Link>
              );
            }
          )}

        </nav>

      </div>

      <button
        onClick={handleLogout}
        className="
          flex
          items-center
          justify-center
          gap-3
          bg-red-500/20
          text-red-300
          py-4
          rounded-2xl
          hover:bg-red-500/30
          transition
        "
      >

        <LogOut size={20} />

        Logout

      </button>

    </aside>
  );
}