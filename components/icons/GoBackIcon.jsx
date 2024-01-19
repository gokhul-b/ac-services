"use client";
import { useRouter } from "next/navigation";
import React from "react";

const GoBackIcon = ({ page }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(page.path);
      }}
      className="hover:border border-none hover:bg-gray-200 hover:rounded-full px-2 py-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        width="18"
        viewBox="0 0 448 512"
      >
        <path
          opacity="1"
          fill="#383838"
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
        />
      </svg>
    </div>
  );
};

export default GoBackIcon;
