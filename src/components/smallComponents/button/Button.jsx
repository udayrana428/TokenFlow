import React from "react";

const Button = ({
  children,
  classes,
  onClick = () => {
    console.log("No onClick");
  },
  isDisabled = false,
  btnType = "button",
}) => {
  return (
    <>
      <button
        onClick={() => onClick()}
        disabled={isDisabled}
        className={`bg-primary-dark hover:bg-primary ${
          isDisabled ? "cursor-not-allowed" : ""
        } text-white font-semibold shadow-lg ${classes}`}
        type={btnType}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
