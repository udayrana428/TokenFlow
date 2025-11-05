import React, { useEffect } from "react";
import heroBg from "../assets/bg.svg";
import Button from "../components/smallComponents/button/Button";
import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchTokensList } from "../services/apiCoinGecko";
import { useToken } from "../context/TokenContext";

const Home = () => {
  const navigate = useNavigate();
  // const { tokensList, uniqueChains } = useLoaderData();
  const { setAllChains, setAllTokens } = useToken();

  useEffect(() => {
    // setAllChains(uniqueChains);
    // setAllTokens(tokensList);
  }, []);

  return (
    <>
      <section
        className={`flex flex-col items-center justify-center h-screen text-white text-center px-6 bg-cover bg-center`}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 font-roboto">
          True Crypto Ownership. <br />
          <span className="text-primary">Powerful Web3 Experiences</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-6 font-roboto">
          Unlock the power of your cryptocurrency assets and explore the world
          of Web3 with{" "}
          <span className="font-semibold text-primary-light">TokenFlow</span>.
        </p>
        {/* <button className="bg-primary-dark hover:bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg">
          Get Started
        </button> */}
        <Button
          classes="rounded-lg py-3 px-6"
          onClick={() => navigate("/trade")}
        >
          Get Started
        </Button>
      </section>
    </>
  );
};

const loader = async () => {
  const tokensList = await fetchTokensList();

  const uniqueChains = Array.from(
    new Set(tokensList.flatMap((token) => Object.keys(token.platforms)))
  );
  localStorage.setItem("allTokens", JSON.stringify(tokensList));
  localStorage.setItem("allChains", JSON.stringify(uniqueChains));
  return;
};

export { loader };
export default Home;
