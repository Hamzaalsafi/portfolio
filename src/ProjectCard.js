import React, { useState, useEffect } from "react";
import { Gallery } from "./Gallery";
import { motion } from "framer-motion";
import { useModeContext } from "./DarkModeProvider";
import Tooltip from "@mui/material/Tooltip";
import { useInView } from "react-intersection-observer";

export function ProjectCard({ project }) {
  const handleLinkClickLink = () => {
    window.open(project.link, "_blank");
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 780);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [showOptions, setShowOptions] = useState("laptop");
  const { mode } = useModeContext();
  const handleTooltipClick = (tooltipName) => {
    if (activeTooltip === tooltipName) {
      setActiveTooltip(null);
    } else {
      setActiveTooltip(tooltipName);
    }
  };

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: isMobile ? 0.5 : 0.76,
  });

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: inView ? 1 : 0.1,
        y: inView ? 0 : 20,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: inView ? 0 : 0.1,
      }}
      className={`flex md:flex-row flex-col phone justify-between h-fit rounded-xl p-4 pb-3 ${mode === "dark" ? "bg-zinc-900" : "bg-gray-200"} ${inView ? "donation" : ""} w-full ${inView ? "opacity-100" : "opacity-15"}`}
    >
      <div className="md:w-1/2 md:pr-10 justify-start">
        <h1
          onClick={handleLinkClickLink}
          className="text-2xl cursor-pointer font-bold"
        >
          {project.title || " "}
        </h1>
        <h2 className="text-lg pt-1 font-bold">{project.title2 || " "}</h2>
        <p
          className={`text-md md:text-[1.17rem] ${mode !== "dark" ? "text-zinc-800" : "text-zinc-300"}`}
        >
          {project.description || " "}
        </p>
        <h2 className="text-lg py-1 font-bold">Key Features:</h2>
        <ul
          className={`list-disc text-md md:text-[1.1rem] pl-5 ${mode !== "dark" ? "text-zinc-800" : "text-zinc-300"}`}
        >
          {project.keyFeatures &&
            project.keyFeatures.map((li, index) => <li key={index}>{li}</li>)}
        </ul>
        <div className="flex gap-2.5 pt-2 items-center flex-wrap">
          {project.tooTip &&
            project.tooTip.map((title, index) => (
              <Tooltip
                key={index}
                PopperProps={{
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -4],
                      },
                    },
                  ],
                }}
                title={title}
                arrow
                open={activeTooltip === title}
                onClose={() => setActiveTooltip(null)}
                onOpen={() => setActiveTooltip(title)}
                classes={{
                  tooltip:
                    mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                  arrow: mode === "dark" ? "custom-arrow" : "custom-arrow2",
                }}
              >
                <motion.div
                  whileHover={{
                    rotate: 180,
                    scale: 1.15,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => handleTooltipClick(title)}
                  className="w-10 h-10 cursor-pointer p-0.5 donation rounded-full flex items-center justify-center"
                >
                  <img
                    className={`h-8 w-8 ${title === "javascript" ? "rounded-full" : ""}`}
                    src={project.ToolTipSvg[index]}
                    alt={`${title} Logo`}
                  />
                </motion.div>
              </Tooltip>
            ))}
        </div>
      </div>

      <div className="md:w-1/2 md:mb-0 mb-5 relative">
        <div className="md:absolute relative z-50 text-slate-950 text-2xl md:text-3xl gap-5 text-center mb-2 w-full flex justify-center items-center">
          <motion.img
            onClick={(e) => {
              e.preventDefault();
              setShowOptions("iphone");
              scrollToElement("iphone-section");
            }}
            src="/iphone.svg"
            alt="Iphone"
            className={`w-8 h-8 md:h-10 md:w-10 px-1 cursor-pointer rounded-xl ${mode === "dark" && showOptions === "iphone" ? "bg-gray-300" : "bg-gray-300"}`}
            animate={{
              scale: showOptions === "iphone" ? 1.15 : 1,
              boxShadow:
                showOptions === "iphone"
                  ? "0px 4px 15px rgba(0, 0, 0, 0.2)"
                  : "none",
              backgroundColor:
                showOptions === "iphone"
                  ? "rgba(255, 255, 255, 1)"
                  : "rgba(0, 0, 0, 0)",
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          />

          <motion.img
            onClick={(e) => {
              e.preventDefault();
              setShowOptions("laptop");
              scrollToElement("laptop-section");
            }}
            src="/laptop2.svg"
            alt="Laptop"
            className={`w-8 h-8 md:h-10 md:w-10 p-1 cursor-pointer rounded-xl ${mode === "dark" && showOptions === "laptop" ? "bg-gray-300" : "bg-gray-300"}`}
            animate={{
              scale: showOptions === "laptop" ? 1.15 : 1,
              boxShadow:
                showOptions === "laptop"
                  ? "0px 4px 15px rgba(0, 0, 0, 0.2)"
                  : "none",
              backgroundColor:
                showOptions === "laptop"
                  ? "rgba(255, 255, 255, 1)"
                  : "rgba(0, 0, 0, 0)",
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          />
        </div>

        {showOptions === "laptop" && (
          <Gallery images={project.macImages} link={project.link} />
        )}

        {showOptions === "iphone" && (
          <Gallery images={project.phoneImages} link={project.link} />
        )}
      </div>
    </motion.div>
  );
}
