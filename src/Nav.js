import React, { useState, useEffect, useRef } from "react";
import { useModeContext } from "./DarkModeProvider";
import { motion } from "framer-motion";
export function Nav({ scrollToHome, scrollToProjects }) {
  const [activeSection, setActiveSection] = useState("Home");
  const { mode, setMode } = useModeContext();
  const [scroll, setScroll] = useState(0);
  const handleSectionClick = (section) => {
    if (section === "Projects") {
      scrollToProjects();
    }
    if (section === "Home") {
      scrollToHome();
    }
  };
  const toggleMode = () => {
    setTimeout(() => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (scrollPosition < viewportHeight / 2) {
        setActiveSection("Home");
      } else if (scrollPosition < viewportHeight * 1.5) {
        setActiveSection("Projects");
      } else if (scrollPosition < viewportHeight * 2.5) {
        setActiveSection("Skills");
      } else if (scrollPosition < viewportHeight * 3.5) {
        setActiveSection("About");
      } else {
        setActiveSection("Contact");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`w-screen text-md md:text-xl gap-3 md:gap-5  ${mode === "dark" ? "text-gray-200" : "text-black"} h-14 md:justify-center items-center flex relative navbar`}
    >
      {["Home", "Projects", "Skills", "About", "Contact"].map((section) => (
        <h1
          key={section}
          onClick={() => handleSectionClick(section)}
          className={`border-0 text-nav hover:scale-110 py-1
        hover:duration-150

       
        ${
          activeSection === section
            ? "border-b-2 "
            : "border-b-2 border-transparent"
        } border-transition duration-[0.3s] cursor-pointer
      ${mode === "light" && activeSection === section ? "border-zinc-900 " : "border-gray-300 "}

      
      `}
        >
          {section === "Home" ? "ᕼᗩᗰᘔᗩ" : section}
        </h1>
      ))}

      <motion.div
        onClick={toggleMode}
        whileHover={{
          scale: 1.07,
        }}
        whileTap={{
          rotate: 180,
          scale: 1.15,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 8,
          },
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute right-1 md:right-3 flex items-center md:p-4 justify-center h-full"
      >
        <motion.img
          src={mode === "light" ? "/moon.png" : "/sun.png"}
          alt="Toggle Dark Mode"
          className="w-10 md:w-14 p-0.5  md:h-14 cursor-pointer"
          animate={{ rotate: mode === "light" ? 0 : 180 }}
          transition={{ type: "spring", stiffness: 250, damping: 15 }}
        />
      </motion.div>
    </div>
  );
}
