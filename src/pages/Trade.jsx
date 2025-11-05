import React from "react";
import TokenTransfer from "../components/TokenTransfer/TokenTransfer";
import { Link, NavLink, Outlet } from "react-router-dom";

const Trade = () => {
  return (
    <>
      <main className="pt-32 h-screen">
        <section className="max-w-xl mx-auto shadow-lg rounded-xl bg-gray-800">
          <nav
            className="flex justify-start gap-4 p-4 "
            aria-label="Trade Navigation"
          >
            <NavLink
              to="/trade/token-swap"
              className={({ isActive }) =>
                `px-3 py-2 rounded-full text-sm font-medium ${
                  isActive
                    ? "bg-primary text-white"
                    : " hover:text-white"
                }`
              }
            >
              Token Swap
            </NavLink>
            <NavLink
              to="/trade/token-transfer"
              className={({ isActive }) =>
                `px-3 py-2 rounded-full text-sm font-medium ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:text-white"
                }`
              }
            >
              Token Transfer
            </NavLink>
          </nav>
          <div className="p-4 flex flex-col space-y-4">
            {/* Dynamic Content Loaded Here */}
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
};

export default Trade;
