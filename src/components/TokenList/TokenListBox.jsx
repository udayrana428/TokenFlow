import React, { useState, useEffect, useCallback } from "react";
import TokenListItem from "./TokenListItem";
import { useLoaderData } from "react-router-dom";
import { fetchTokensList } from "../../services/apiCoinGecko";
import Button from "../smallComponents/button/Button";
import { useToken } from "../../context/TokenContext";

// Constants for chunk size and debounce delay
const CHUNK_SIZE = 100;
const DEBOUNCE_DELAY = 500; // Delay in milliseconds for debouncing
const THROTTLE_DELAY = 500; // Delay in milliseconds for throttling

const TokenListBox = () => {
  const { setSelectedToken, selectedToken } = useToken();

  // const { tokensList: allTokens } = useLoaderData(); // Fetch all tokens initially
  const [allTokens, setAllTokens] = useState(() => {
    // Initialize from localStorage
    const storedTokens = localStorage.getItem("allTokens");
    return storedTokens ? JSON.parse(storedTokens) : [];
  });
  const [allChains, setAllChains] = useState(() => {
    const storedChains = localStorage.getItem("allChains");
    return storedChains ? JSON.parse(storedChains) : [];
  });
  const [tokensList, setTokensList] = useState([]); // Displayed tokens
  const [chunkIndex, setChunkIndex] = useState(0); // Current chunk index
  const [loading, setLoading] = useState(false); // Loading state
  const [searchQuery, setSearchQuery] = useState(""); // Search input value

  const [debounceTimeout, setDebounceTimeout] = useState(null); // For debouncing

  const handleSelectedToken = (id) => {
    if (id === selectedToken) {
      setSelectedToken(null);
    } else {
      setSelectedToken(id);
    }
  };

  useEffect(() => {
    // Load the first chunk initially
    setTokensList(allTokens.slice(0, CHUNK_SIZE));
    setChunkIndex(1);
  }, [allTokens]);

  // Load more tokens (Throttled version)
  const loadMoreTokens = useCallback(() => {
    if (loading) return; // Prevent concurrent calls

    // Check if the last token is visible
    const lastToken = document.querySelector(
      ".token-list > .token-item:last-child"
    );
    if (lastToken) {
      const lastTokenRect = lastToken.getBoundingClientRect();
      const isLastTokenVisible =
        lastTokenRect.bottom <= window.innerHeight && lastTokenRect.top >= 0;

      if (isLastTokenVisible) {
        setLoading(true);

        // Add the next chunk of tokens
        setTimeout(() => {
          const nextChunk = allTokens.slice(
            chunkIndex * CHUNK_SIZE,
            (chunkIndex + 1) * CHUNK_SIZE
          );

          if (nextChunk.length > 0) {
            setTokensList((prev) => [...prev, ...nextChunk]);
            setChunkIndex((prev) => prev + 1);
          }

          setLoading(false);
        }, 500); // Simulating delay
      }
    }
  }, [loading, chunkIndex, allTokens]);

  // Throttle scroll events
  const throttledLoadMoreTokens = useCallback(() => {
    if (loading) return;

    setLoading(true);
    loadMoreTokens();
    setLoading(false);
  }, [loading, loadMoreTokens]);

  // Debounced Search Change Handler
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear the previous timeout to implement debouncing
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      // Filter tokens and reset the chunk index after debounce delay
      const filteredTokens = allTokens.filter((token) =>
        token.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setTokensList(filteredTokens.slice(0, CHUNK_SIZE));
      setChunkIndex(1);
    }, DEBOUNCE_DELAY); // Set the debounce delay

    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    // Throttle the scroll event listener to call loadMoreTokens at most every THROTTLE_DELAY milliseconds
    const handleScroll = () => {
      if (!loading) throttledLoadMoreTokens();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [throttledLoadMoreTokens, loading]);

  return (
    <div className="token-list-box rounded-lg space-y-3">
      <div className="flex space-x-2 items-center w-fit hover:bg-gray-900 justify-self-center p-2 rounded-md cursor-pointer">
        <img src="" alt="" />
        <h3>All networks</h3>
        <i className="fa-solid fa-chevron-down"></i>
      </div>

      <div className="">
        {allChains.map((chain) => (
          <>
            <div className=""></div>
          </>
        ))}
      </div>

      {/* Search Input */}
      <div className="search-box mb-4">
        <form
          aria-label="Search Form"
          className="relative"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search Input"
            className="bg-transparent border w-full focus:outline-none focus:ring-4 px-3 py-2 rounded-full focus:ring-indigo-400 focus:ring-offset-2"
            value={searchQuery}
            onChange={handleSearchChange}
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
      </div>

      {/* Token List */}
      <div className="token-list space-y-4 h-60 overflow-y-scroll scrollbar">
        {tokensList.map((token) => (
          <TokenListItem
            className="token-item"
            token={token}
            key={token.id}
            handleSelectedToken={handleSelectedToken}
            showChains={selectedToken === token.id}
          />
        ))}

        {!loading && tokensList.length === 0 && (
          <div className="text-center text-gray-500">
            No tokens found for "{searchQuery}".
          </div>
        )}
      </div>

      {/* Loader */}
      {loading && (
        <div className="text-center text-gray-500 my-4">Loading...</div>
      )}
    </div>
  );
};
export default TokenListBox;
