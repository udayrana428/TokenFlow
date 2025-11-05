import React, { useEffect, useState } from "react";
import Loader from "../components/smallComponents/loader/Loader";
import Header from "../components/Header/Header";
import { Outlet, useNavigation } from "react-router-dom";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + Math.random() * 20, 90)); // Increment progress
      }, 300);
    } else {
      setProgress(100); // Complete progress when loading ends
      setTimeout(() => setProgress(0), 500); // Reset progress after a brief pause
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <>
      <div className="grid h-screen grid-rows-[auto_1fr_auto]">
        <Header />
        <div className="">
          <main className="h-screen">
            {/* <h2>Content</h2> */}
            {isLoading && <Loader progress={progress} />}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
