
import React from "react";

const Footer = () => (
  <footer className="
    w-full
    py-5
    mt-8
    flex
    justify-center
    items-center
    bg-transparent
    fixed
    bottom-0
    left-0
    z-40
    ">
    <span className="
      text-lg
      md:text-xl
      font-semibold
      text-center
      text-gray-700
      dark:text-gray-200
      drop-shadow-sm
      px-4
      ">
      Copyright © 2025{" "}
      <a
        href="https://www.linkedin.com/in/anasshoudzi/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-all duration-150"
      >
        Anass Houdzi
      </a>
      {" – Tous droits réservés."}
    </span>
  </footer>
);

export default Footer;
