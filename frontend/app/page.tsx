"use client";

import Link from "next/link";

export default function HomePage() {

  const stats = [
    {
      value: "500+",
      label: "Investors",
    },
    {
      value: "₹50 Cr+",
      label: "Assets Managed",
    },
    {
      value: "1000+",
      label: "Transactions",
    },
    {
      value: "99.9%",
      label: "Security",
    },
  ];

  const features = [
    "Portfolio Tracking",
    "Mutual Funds",
    "Equity Investments",
    "Investor Management",
    "Transaction Monitoring",
    "Performance Analytics",
  ];

  const benefits = [
    "Centralized Wealth Management",
    "Real-Time Portfolio Tracking",
    "Secure Investor Data",
    "Mutual Fund & Equity Integration",
    "Advanced Reporting",
    "Scalable Architecture",
  ];

  return (
    <main className="
      min-h-screen
      bg-[#020617]
      text-white
    ">

      {/* HERO */}

      <section className="
        px-8
        md:px-20
        py-24
      ">

        <div className="
          max-w-5xl
          mx-auto
          text-center
        ">

          <p className="
            text-indigo-400
            uppercase
            tracking-[5px]
            mb-6
          ">
            Fintech Platform
          </p>

          <h1 className="
            text-6xl
            md:text-8xl
            font-bold
            mb-8
          ">
            Unified Wealth
          </h1>

          <p className="
            text-xl
            text-gray-400
            leading-relaxed
            max-w-4xl
            mx-auto
          ">
            Manage your investments,
            track portfolio performance,
            monitor mutual funds,
            and grow your wealth through
            a single unified platform.

            Unified Wealth provides
            secure portfolio tracking,
            investment analytics,
            transaction management,
            and wealth monitoring
            for modern investors.
          </p>

          <div className="
            mt-12
            flex
            justify-center
          ">

            <Link
              href="/login"
              className="
                bg-indigo-600
                hover:bg-indigo-700
                px-10
                py-4
                rounded-2xl
                font-semibold
                text-lg
                transition
              "
            >
              Login
            </Link>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="
        px-8
        md:px-20
        pb-20
      ">

        <div className="
          max-w-6xl
          mx-auto
          grid
          grid-cols-2
          md:grid-cols-4
          gap-6
        ">

          {stats.map((item) => (

            <div
              key={item.label}
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-8
                text-center
              "
            >

              <h3 className="
                text-3xl
                font-bold
                text-indigo-400
              ">
                {item.value}
              </h3>

              <p className="
                text-gray-400
                mt-2
              ">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="
        px-8
        md:px-20
        py-20
      ">

        <div className="
          max-w-6xl
          mx-auto
        ">

          <h2 className="
            text-5xl
            font-bold
            text-center
            mb-16
          ">
            Platform Features
          </h2>

          <div className="
            grid
            md:grid-cols-3
            gap-8
          ">

            {features.map((feature) => (

              <div
                key={feature}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-8
                  text-center
                "
              >

                <h3 className="
                  text-2xl
                  font-semibold
                ">
                  {feature}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}

      <section className="
        px-8
        md:px-20
        py-20
      ">

        <div className="
          max-w-5xl
          mx-auto
        ">

          <h2 className="
            text-5xl
            font-bold
            text-center
            mb-16
          ">
            Why Choose Unified Wealth
          </h2>

          <div className="
            grid
            md:grid-cols-2
            gap-8
          ">

            {benefits.map((item) => (

              <div
                key={item}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  p-6
                "
              >

                <span className="
                  text-green-400
                  font-bold
                  mr-3
                ">
                  ✓
                </span>

                {item}

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="
        border-t
        border-white/10
        py-8
        text-center
        text-gray-500
      ">
        © 2026 Unified Wealth Platform
      </footer>

    </main>
  );
}