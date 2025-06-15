
import React from "react";

const Footer = () => (
  <footer
    className="
      w-full
      py-8
      mt-10
      mb-6
      flex
      justify-center
      items-center
      bg-transparent
      z-40
    "
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
