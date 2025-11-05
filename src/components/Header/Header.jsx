import React from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../smallComponents/button/Button";
import { useWallet } from "../../context/WalletContext";

const Header = () => {
  const { isConnected, connectWallet, account } = useWallet();
  return (
    <>
      <header className="p-4 fixed top-0 w-full ">
        <div className="container justify-between flex items-center ">
          {/* <!-- Logo --> */}
          <div className="logo text-3xl">
            <a href="/" title="Home" className="text-white">
              Token<span className="text-primary">Flow</span>
            </a>
          </div>

          {/* <!-- Navigation Links --> */}
          <nav aria-label="Primary Navigation">
            <ul className="nav-links flex space-x-4">
              <li>
                <NavLink
                  to="/"
                  title="Home"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/trade"
                  title="Trade"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Trade
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/transactions"
                  title="Transaction History"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Transactions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  title="About Us"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* <!-- Search Input --> */}
          {/* <div className="search-box ">
            <form aria-label="Search Form" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search..."
                aria-label="Search Input"
                className="bg-transparent border outline-none focus:ring-4 px-3 py-2 rounded-full focus:ring-indigo-400 focus:ring-offset-2"
                required
              />
              <button
                type="submit"
                aria-label="Search Button"
                className="absolute right-0 mt-2 mr-2"
              >
                🔍
              </button>
            </form>
          </div> */}

          {/* <!-- Account Section --> */}
          <div className="account space-x-4 flex items-center">
            {isConnected ? (
              <div className="flex space-x-2">
                <div className="wallet">
                  <i className="fa-solid fa-wallet"></i>
                </div>
                <p className="account-address">
                  {account.slice(0, 6).concat("...")}
                  {account.slice(-4)}
                </p>
              </div>
            ) : (
              <Button classes="rounded-full px-3 py-2" onClick={connectWallet}>
                <i className="fa-solid fa-wallet"></i> Connect
              </Button>
            )}
            <a href="#" title="Setting">
              <i className="fa-solid fa-gear"></i>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
