
import React from "react";

const Footer = () => (
  <footer className="
    w-full py-3 mt-4 mb-2
    flex justify-center items-center
    bg-transparent z-40
  ">
    <div className="
      text-sm md:text-base font-normal text-center
      text-gray-500 dark:text-gray-400
      drop-shadow-sm px-2 max-w-4xl
    ">
      <span>
        Copyright © 2025{" "}
        <a
          href="https://www.linkedin.com/in/anasshoudzi/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-blue-600 dark:text-blue-400 
            hover:underline font-semibold 
            transition-all duration-200
            hover:text-blue-700 dark:hover:text-blue-300
          "
        >
          Anass Houdzi
        </a>
        {" – Tous droits réservés."}
      </span>
    </div>
  </footer>
);

export default Footer;
