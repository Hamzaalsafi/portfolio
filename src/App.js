import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTypewriter, cursor, Cursor } from "react-simple-typewriter";
import { Nav } from "./Nav";
import { Project } from "./Project";
import { MorphingBubble } from "./MorphingBubble";
import { useModeContext } from "./DarkModeProvider";

import { Loading } from "./Loading";
import { Skills } from "./Skills";
function App() {
  const { mode } = useModeContext();
  const [loading, setLoading] = useState(true);
  const Home = useRef(null);
  const Projects = useRef(null);
  const skills = useRef(null);
  const handleLinkClickLinkedin = () => {
    window.open("www.linkedin.com/in/hamza-alsafi-b52401272", "_blank");
  };
  const handleLinkClickGithub = () => {
    window.open("https://github.com/Hamzaalsafi", "_blank");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3100);
  }, []);
  const smoothScrollTo = (element) => {
    const targetPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 700;
    let start = null;

    function animationStep(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const ease = easeInOutCubic(progress / duration);
      window.scrollTo(0, startPosition + distance * ease);
      if (progress < duration) {
        requestAnimationFrame(animationStep);
      }
    }

    requestAnimationFrame(animationStep);
  };

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const scrollToHome = () => smoothScrollTo(Home.current);
  const scrollToSkills = () => smoothScrollTo(skills.current);
  const scrollToProjects = () => smoothScrollTo(Projects.current);
  const [text] = useTypewriter({
    words: [
      "immersive digital journeys",
      "next-gen UI/UX experiences",
      "seamless user interactions",
      "creative front-end solutions",
      "user-centered design innovations",
      "engaging visual experiences",
      "responsive and intuitive designs",
      "high-performance web interfaces",
    ],

    loop: true,
    typeSpeed: 90,
    deleteSpeed: 60,
    delaySpeed: 500,
  });
  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <div className="overflow-x-hidden">
          <motion.div
            ref={Home}
            className={`w-screen h-screen ${mode === "dark" ? "app" : "app2"} app flex flex-col items-center`}
          >
            <Nav
              HomeRef={Home}
              ProjectRef={Projects}
              SkillsRef={skills}
              scrollToSkills={scrollToSkills}
              scrollToHome={scrollToHome}
              scrollToProjects={scrollToProjects}
            />
            <div className="  w-[100%] max-w-[950px] h-screen justify-between  flex-col md:flex-row flex md:justify-between  items-center p-20 px-2 md:px-4 ">
              <div className="flex-col">
                <MorphingBubble />
              </div>
              <div
                className={`flex-col ${mode === "dark" ? "text-gray-200" : "text-black"}    justify-start pt-4`}
              >
                <h1 className="md:text-4xl text-3xl font-bold  ">
                  Hamza Alsafi
                </h1>
                <h1 className="text-2xl md:text-3xl py-3 ">
                  Front-End & Ux/Ui Designer
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-1 w-fit justify-center items-center mr-2">
                    <img
                      src={`${mode === "dark" ? "/location.svg" : "/locationDark.svg"}`}
                      alt="location"
                      className="md:w-7 md:h-7 w-6 h-6  location"
                    />
                    <hr className="w-[120%] border-b-2 border-red-800  border-opacity-75" />
                  </div>
                  <h1
                    className={`text-xl md:text-2xl ${mode === "dark" ? "text-gray-300" : "text-zinc-950"}`}
                  >
                    Amman,Jordan
                  </h1>
                </div>
                <h1 className="mt-6 text-xl md:text-2xl ">
                  I specialize in{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 animated-gradient-text to-red-500">
                    developing
                  </span>
                </h1>

                <h1 className="     pointer-events-none absolute   text-xl md:text-2xl">
                  {text}
                  <Cursor />
                </h1>
                <div className="flex mt-8 md:mt-16   gap-4 py-6">
                  <motion.div
                    className={`w-11 h-11 md:w-12 md:h-12    flex justify-center  cursor-pointer items-center  rounded-full shadow-lg`}
                    whileHover={{
                      rotate: 180,
                      scale: 1.2,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.img
                      key={mode}
                      onClick={handleLinkClickLinkedin}
                      animate={{
                        opacity: [0, 1],
                        scale: [0.8, 1],
                      }}
                      transition={{
                        opacity: { duration: 0.4, ease: "easeInOut" },
                        scale: { duration: 0.4, ease: "easeInOut" },
                      }}
                      src={`${mode === "dark" ? "/linkedin.svg" : "/linkedinDark.svg"}`}
                      alt="LinkedIn Logo"
                      className="w-11 h-11 md:w-12 md:h-12  "
                    />
                  </motion.div>
                  <motion.div
                    className="w-11 h-11 md:w-12 md:h-12  z-[1] flex cursor-pointer justify-center items-center  rounded-full shadow-lg" // Circular background for logo
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
                  >
                    <motion.img
                      key={mode}
                      onClick={handleLinkClickGithub}
                      animate={{
                        opacity: [0, 1],
                        scale: [0.8, 1],
                      }}
                      transition={{
                        opacity: { duration: 0.4, ease: "easeInOut" },
                        scale: { duration: 0.4, ease: "easeInOut" },
                      }}
                      src="/github.svg"
                      alt="github Logo"
                      className="w-11 h-11 md:w-12 md:h-12 bg-gray-200 border border-gray-200 border-opacity-55 rounded-full "
                    />{" "}
                    {/* LinkedIn SVG logo */}
                  </motion.div>
                  <motion.div
                    className="w-11 h-11 md:w-12 md:h-12overflow-none flex cursor-pointer justify-center items-center rounded-full shadow-lg"
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
                  >
                    <motion.img
                      src={`${mode === "dark" ? "/gmail.svg" : "/mailDark.svg"}`}
                      alt="gmail Logo"
                      className="w-12 h-12"
                      key={mode}
                      animate={{
                        opacity: [0, 1],
                        scale: [0.8, 1],
                      }}
                      transition={{
                        opacity: { duration: 0.4, ease: "easeInOut" },
                        scale: { duration: 0.4, ease: "easeInOut" },
                      }}
                    />
                  </motion.div>
                  <motion.div
                    className="w-11 h-11 md:w-12 md:h-12  flex cursor-pointer justify-center items-center  rounded-full shadow-lg" // Circular background for logo
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
                  >
                    <motion.img
                      key={mode}
                      animate={{
                        opacity: [0, 1],
                        scale: [0.8, 1],
                      }}
                      transition={{
                        opacity: { duration: 0.4, ease: "easeInOut" },
                        scale: { duration: 0.4, ease: "easeInOut" },
                      }}
                      src={`${mode === "dark" ? "/cv.svg" : "/cvdark.svg"}`}
                      alt="cv Logo"
                      className="w-11 h-11 md:w-12 md:h-12"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
            <div
              className={`w-full  relative h-[6.2em] ${mode === "dark" ? "bg-zinc-900" : "bg-zinc-300"}  border-0 border-t-2 border-gray-500  bottom-0`}
            >
              <div className="w-full h-full relative flex justify-center items-start top-[-14px] md:top-[-5px] ">
                <div className="chevron"></div>
                <div className="chevron"></div>
                <div className="chevron"></div>
              </div>
            </div>
          </motion.div>
          <div ref={Projects}>
            <Project />
          </div>
          <div ref={skills}>
            {" "}
            <Skills />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
