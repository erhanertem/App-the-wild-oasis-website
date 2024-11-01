// MAKES IT CC SO THAT WE CAN USE USESTATE WHICH IS EXCLUSIVE TO CLIENT SIDE REACT
"use client";

// import Logo from "@/app/_components/Logo";
import { useState } from "react";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="border-b border-primary-700 pb-1 leading-3 text-primary-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
      {/* TESTING A SC TURN INTO CC IN A USE CLIENT BOUNDARY */}
      {/* <Logo /> */}
    </span>
  );
}

export default TextExpander;
