import React, { useEffect, useState } from "react";
import feather from "feather-icons";
import { motion } from "framer-motion";
import { useModeContext } from "./DarkModeProvider";
import { useInView } from "react-intersection-observer";
const AboutME =
  "I'm Hamza Alsafi, a front-end developer with a strong passion for UX/UI design, focusing on creating intuitive, user-friendly interfaces that seamlessly blend aesthetics and functionality. Currently in my fourth year of Computer Engineering studies, I apply both technical knowledge and design principles to build impactful digital experiences.With a Codeforces rating of 1550, I've sharpened my problem-solving skills through competitive programming and applied them to several projects. I’ve also organized university-level programming competitions. As I continue to grow, I’m expanding my expertise into back-end development to offer full-stack solutions and tackle a wider range of technical challenges.";
const rows = [
  [
    { label: "ESC", icon: "x", className: "key__esc" },
    { label: "! 1", className: "key__symbols" },
    { label: "@ 2", className: "key__symbols" },
    { label: "# 3", className: "key__symbols" },
    { label: "$ 4", className: "key__symbols" },
    { label: "% 5", className: "key__symbols" },
    { label: "^ 6", className: "key__symbols" },
    { label: "& 7", className: "key__symbols" },
    { label: "* 8", className: "key__symbols" },
    { label: "( 9", className: "key__symbols" },
    { label: ") 0", className: "key__symbols" },
    { label: "_ -", className: "key__symbols" },
    { label: "+ =", className: "key__symbols" },
    {
      label: "Delete",
      icon: "delete",
      className: "key__delete key__icon mainButtons",
    },
  ],
  [
    { label: "Tab", className: "key__oneandhalf mainButtons" },
    { label: "Q" },
    { label: "W" },
    { label: "E" },
    { label: "R" },
    { label: "T" },
    { label: "Y" },
    { label: "U" },
    { label: "I" },
    { label: "O" },
    { label: "P" },
    { label: "{ [", className: "key__symbols" },
    { label: "} ]", className: "key__symbols" },
    { label: "| \\", className: "key__symbols key__oneandhalf" },
  ],
  [
    { label: "CapsLk", className: "key__caps mainButtons" },
    { label: "A" },
    { label: "S" },
    { label: "D" },
    { label: "F" },
    { label: "G" },
    { label: "H" },
    { label: "J" },
    { label: "K" },
    { label: "L" },
    { label: ": ;", className: "key__symbols" },
    { label: "\" '", className: "key__symbols" },
    {
      label: "Enter",
      icon: "corner-down-left",
      className: "key__enter mainButtons",
    },
  ],
  [
    {
      label: "Shift",
      className: "key__shift-left mainButtons",
    },
    { label: "Z" },
    { label: "X" },
    { label: "C" },
    { label: "V" },
    { label: "B" },
    { label: "N" },
    { label: "M" },
    { label: "> .", className: "key__symbols" },
    { label: "< .", className: "key__symbols" },
    { label: "? /", className: "key__symbols" },
    { label: "↑", icon: "arrow-up-circle" },
    { label: "Up", icon: "arrow-up", className: "key__arrow" },
    { label: "Trash", icon: "trash-2" },
  ],
  [
    { label: "Ctrl", className: "key__bottom-funct mainButtons" },
    { label: "Win", className: "key__bottom-funct mainButtons" },
    { label: "Alt", className: "key__bottom-funct mainButtons" },
    { label: "Space", className: "key__spacebar", id: "SPACEBAR" },
    { label: "Alt", className: "mainButtons" },
    { label: "Fn", className: "mainButtons" },
    { label: "←", icon: "arrow-left", className: "key__arrow" },
    { label: "↓", icon: "arrow-down", className: "key__arrow" },
    { label: "→", icon: "arrow-right", className: "key__arrow" },
  ],
];
export default function Keyboard({ AboutMeRef }) {
  const { mode } = useModeContext();
  const [typedText, setTypedText] = useState("");
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (inView) {
      feather.replace();

      const handleKeyDown = (event) => {
        const pressedKey = event.key.toUpperCase();

        const correctChar = AboutME[currentIndex]?.toUpperCase();

        const keyElement = document.getElementById(pressedKey);
        if (keyElement) {
          keyElement.classList.add("key--clicked");
          setTimeout(() => {
            keyElement.classList.remove("key--clicked");
          }, 500);
        }

        if (pressedKey === correctChar) {
          setTypedText((prevText) => {
            const newText = prevText + pressedKey;
            return newText;
          });

          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          console.log("Wrong key");
        }

        if (pressedKey === " ") {
          const x = document.querySelector(".keyboard");
          x.classList.add("spacebar-clicked");
          setTimeout(() => {
            x.classList.remove("spacebar-clicked");
          }, 200);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [currentIndex, inView]);

  return (
    <div
      ref={ref}
      className={`w-screen h-screen ${mode === "dark" ? "app" : "app2"}  flex flex-col py-16 justify-between items-center `}
    >
      <motion.h1
        initial={{ opacity: 0.01, y: -20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
        transition={{ duration: 0.3 }}
        className={`${mode === "dark" ? "text-gray-200" : "text-zinc-950"}  text-2xl md:text-3xl`}
      >
        About Me
      </motion.h1>
      <motion.div
        initial={{ opacity: 0.01, y: -20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
        transition={{ duration: 0.3 }}
        className={`text-lg md:text-2xl  text-center w-[90%] md:w-[60%] ${mode === "dark" ? "text-gray-200" : "text-zinc-950"} leading-relaxed`}
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          maxWidth: "100%",
        }}
      >
        {AboutME.split("").map((char, index) => (
          <motion.span
            key={index}
            className={
              index < typedText.length &&
              typedText[index] === char.toUpperCase()
                ? "text-red-500"
                : "text-gray-200"
            }
            initial={{ opacity: 0.1, scale: 0.95 }}
            animate={{
              opacity:
                index < typedText.length ? 1 : mode === "dark" ? 0.5 : 0.7,
              color:
                index < typedText.length &&
                typedText[index] === char.toUpperCase()
                  ? mode === "dark"
                    ? "#fffff4"
                    : "#000000"
                  : mode === "dark"
                    ? "#fffff4"
                    : "#000000",
              scale: index < typedText.length ? 1.35 : 1,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
              scale: {
                type: "spring",
                stiffness: 250,
                damping: 18,
              },
              opacity: {
                type: "tween",
                ease: "easeInOut",
                duration: 0.2,
              },
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        ref={ref}
        className={`keyboard w-fit h-fit ${inView ? "block" : "hidden"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0.1 }}
        transition={{ duration: 0.3 }}
      >
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row flex">
            {row.map((key, index) => (
              <div
                key={index}
                id={key.label.toUpperCase()}
                className={`flex flex-col justify-between items-center key ${key.className ? key.className : ""}`}
              >
                {key.icon ? (
                  <i data-feather={key.icon}></i>
                ) : (
                  <>
                    {key.label}
                    {key.label.includes(" ") && (
                      <span>{key.label.split(" ")[1]}</span>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
