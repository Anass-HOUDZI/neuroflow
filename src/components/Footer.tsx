
import React from "react";

const Footer = () => (
  <footer className="w-full py-3 flex justify-center items-center bg-transparent fixed bottom-0 left-0 z-40">
    <span className="text-xs text-center text-gray-500 dark:text-gray-400">
      Copyright © 2025{" "}
      <a
        href="https://www.linkedin.com/in/anasshoudzi/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline font-medium"
      >
        Anass Houdzi
      </a>
      {" – Tous droits réservés."}
    </span>
  </footer>
);

export default Footer;
