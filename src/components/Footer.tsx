
import React from "react";

const Footer = () => (
  <footer
    className="
      w-full
      py-2
      mt-2
      mb-1
      flex
      justify-center
      items-center
      bg-transparent
      z-40
      border-none
    "
    style={{
      border: "none",
      background: "transparent",
      boxShadow: "none",
    }}
  >
    <span
      className="
        text-sm
        md:text-base
        font-normal
        text-center
        text-gray-500
        dark:text-gray-400
        drop-shadow-sm
        px-2
      "
    >
      Copyright © 2025{" "}
      <a
        href="https://www.linkedin.com/in/anasshoudzi/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold transition-all"
      >
        Anass Houdzi
      </a>
      {" – Tous droits réservés."}
    </span>
  </footer>
);

export default Footer;
