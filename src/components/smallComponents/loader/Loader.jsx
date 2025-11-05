import React from "react";

const Loader = ({ progress }) => {
  return (
    <>
      <div className="loader w-full fixed top-0 z-50">
        <div
          className=" bg-primary h-2 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  );
};

export default Loader;
