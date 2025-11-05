import { useState } from "react";
import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import NotFound from "./pages/NotFound";
import Home, { loader as homeLoader } from "./pages/Home";
import { WalletProvider } from "./context/WalletContext";
import { TokenProvider } from "./context/TokenContext";
import TokenTransfer from "./components/TokenTransfer/TokenTransfer";
import Trade from "./pages/Trade";
import TokenSwap from "./components/TokenSwap/TokenSwap";
import Test from "./pages/Test";
import TokenListBox from "./components/TokenList/TokenLIstBox";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: homeLoader,
          errorElement: <NotFound />,
        },
        {
          path: "/trade",
          element: <Trade />,
          children: [
            {
              index: true,
              element: <Navigate to="/trade/token-swap" replace />,
            },
            {
              path: "token-transfer",
              element: <TokenTransfer />,
            },
            {
              path: "token-swap",
              element: <TokenSwap />,
            },
            {
              path: "tokensList",
              element: <TokenListBox />,
              errorElement: <NotFound />,
            },
          ],
        },
        {
          path: "/test",
          element: <Test />,
        },
      ],
    },
  ]);
  return (
    <>
      <WalletProvider>
        <TokenProvider>
          <RouterProvider router={router} />
        </TokenProvider>
      </WalletProvider>
    </>
  );
}

export default App;
