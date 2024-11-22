import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useModeContext } from "./DarkModeProvider";
export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.35,
  });
  const mouseRef = useRef({ x: 70, y: 70 });
  const [animatedPosition, setAnimatedPosition] = useState({ x: 70, y: 70 });
  const animationRef = useRef(null);
  const [blur, setBlur] = useState(false);
  const handleLinkClickLinkedin = () => {
    window.open(
      "https://www.linkedin.com/in/hamza-alsafi-b52401272?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      "_blank"
    );
  };
  const handleLinkClickGithub = () => {
    window.open("https://github.com/Hamzaalsafi", "_blank");
  };
  const handleMouseMove = (event) => {
    mouseRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleMouseEnter = () => setBlur(true);
  const handleMouseLeave = () => setBlur(false);

  const animatePosition = () => {
    setAnimatedPosition((prev) => {
      const newX = prev.x + (mouseRef.current.x - prev.x) * 0.07;
      const newY = prev.y + (mouseRef.current.y - prev.y) * 0.07;

      // Only update state if there's a significant change
      if (Math.abs(newX - prev.x) > 0.1 || Math.abs(newY - prev.y) > 0.1) {
        return { x: newX, y: newY };
      }
      return prev;
    });
    animationRef.current = requestAnimationFrame(animatePosition);
  };

  useEffect(() => {
    if (inView) {
      animationRef.current = requestAnimationFrame(animatePosition);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [inView]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const formRef = useRef(null);
  const { mode } = useModeContext();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mehyved",
        "template_fonvf7x",
        formRef.current,
        "kknS1iAByA6pXghul"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const openCV = () => {
    window.open("/CV.pdf", "_blank");
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`w-screen overflow-hidden relative h-screen ${mode === "dark" ? "app" : "app2"}  app flex flex-col justify-center`}
    >
      <motion.img
        initial={{
          x: animatedPosition.x,
          y: animatedPosition.y,
          filter: "blur(0px)",
        }}
        style={{
          pointerEvents: "none",
          position: "absolute",
          left: `${animatedPosition.x - 10}px`,
          top: `${animatedPosition.y - 10}px`,
          filter: `blur(${blur ? 2 : 0}px)`,
          opacity: `${blur ? 0.6 : 1}`,
        }}
        animate={{
          x: animatedPosition.x,
          y: animatedPosition.y,
          filter: `blur(${blur ? 1.5 : 0}px)`,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`w-14 h-14 transition-filter   transition-opacity duration-200 absolute pokemon ${mode === "dark" ? "opacity-75" : "opacity-90"} `}
        src="/pokemon.svg"
        alt="pokemon"
      />
      <form
        onSubmit={sendEmail}
        ref={formRef}
        className={`${mode === "dark" ? "text-gray-200" : "text-zinc"} h-full justify-center flex flex-col items-center gap-8 w-full`}
      >
        <input
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`z-20 ${
            mode === "dark"
              ? "darkSkillsBox border-opacity-50 text-gray-200 placeholder:text-gray-300 placeholder:text-opacity-85"
              : "lightSkillsBox border-opacity-65 text-zinc-950 placeholder:text-zinc-900 placeholder:text-opacity-85"
          } border-2 border-red-700 rounded-lg text-xl p-4 w-[80%] md:w-[40%] text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500`}
          type="text"
          required
          placeholder="Name"
          name="user_name"
        />
        <input
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`z-20 ${
            mode === "dark"
              ? "darkSkillsBox border-opacity-50 text-gray-200 placeholder:text-gray-300 placeholder:text-opacity-85"
              : "lightSkillsBox border-opacity-65 text-zinc-950 placeholder:text-zinc-900 placeholder:text-opacity-85"
          } border-2 border-red-700 rounded-lg text-xl p-4 w-[80%]    md:w-[40%] text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500`}
          type="email"
          placeholder="Email"
          name="user_email"
          required
        />
        <textarea
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`z-20 ${
            mode === "dark"
              ? "darkSkillsBox border-opacity-50 text-gray-200 placeholder:text-gray-300 placeholder:text-opacity-85"
              : "lightSkillsBox border-opacity-65 text-zinc-950 placeholder:text-zinc-900 placeholder:text-opacity-85"
          } border-2 border-red-700 rounded-lg text-xl p-4 w-[80%] resize-none md:w-[40%] text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500`}
          placeholder="Message"
          name="message"
          required
        />
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          type="submit"
          className={`Send-btn donation z-20 hover:bg-red-900 bg-opacity-90 bg-red-700 border-2 border-red-700 py-2 rounded-lg px-12 ${
            mode === "dark"
              ? " border-opacity-50 text-gray-200  "
              : " border-opacity-65 text-gray-200 "
          }`}
        >
          Send
        </button>
      </form>
      <footer
        className={`flex w-screen absolute h-screen  flex-col items-center justify-end`}
      >
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`flex justify-center h-fit ${mode === "dark" ? "darkSkillsBox" : "lightSkillsBox"}  mt-8 md:mt-16   gap-4 py-6  w-screen`}
        >
          <motion.div
            className={`w-11 h-11 md:w-12 md:h-12 flex justify-center cursor-pointer items-center rounded-full shadow-lg`}
            whileHover={{
              scale: 1.12,
              transition: {
                type: "tween",
                ease: "easeOut",
                duration: 0.1,
              },
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ willChange: "transform, opacity" }}
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
              scale: 1.12,
              transition: {
                type: "tween",
                ease: "easeOut",
                duration: 0.2,
              },
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ willChange: "transform, opacity" }}
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
          </motion.div>
          <motion.div
            className="w-11 h-11 md:w-12 md:h-12overflow-none flex cursor-pointer justify-center items-center rounded-full shadow-lg"
            whileHover={{
              scale: 1.12,
              transition: {
                type: "tween",
                ease: "easeOut",
                duration: 0.2,
              },
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ willChange: "transform, opacity" }}
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
              scale: 1.12,
              transition: {
                type: "tween",
                ease: "easeOut",
                duration: 0.2,
              },
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ willChange: "transform, opacity" }}
          >
            <motion.img
              onClick={openCV}
              key={mode}
              animate={{
                opacity: [0, 1],
                scale: [0.8, 1],
              }}
              transition={{
                opacity: { duration: 0.2, ease: "easeInOut" },
                scale: { duration: 0.2, ease: "easeInOut" },
              }}
              src={`${mode === "dark" ? "/cv.svg" : "/cvdark.svg"}`}
              alt="cv Logo"
              className="w-11 h-11 md:w-12 md:h-12"
            />
          </motion.div>
        </div>
        <h1
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`text-center w-screen pb-3 ${mode === "dark" ? "text-gray-300" : "text-zinc-950"} ${mode === "dark" ? "darkSkillsBox" : "lightSkillsBox"} text-lg `}
        >
          Crafted with love ❤️ by Hamza Alsafi
        </h1>
      </footer>
    </div>
  );
}
