import React, { useEffect, useState, useRef } from "react";
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
export default function Keyboard() {
  const [isDevicePC, setIsDevicePC] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [typeCounters, setTypeCounters] = useState(0);
  const { mode } = useModeContext();
  const [startTime, setStartTime] = useState(null);
  const [cpm, setCpm] = useState(0);
  const [compo, setCompo] = useState(0);
  const [wronge, setWronge] = useState(false);
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("mobile")) {
      setIsDevicePC(false);

      setTypedText(AboutME);
      setIsWorking(false);
    } else if (userAgent.includes("tablet")) {
      setIsWorking(false);

      setTypedText(AboutME);
      setIsDevicePC(false);
    } else {
      setIsDevicePC(true);
    }
  }, []);
  const [typedText, setTypedText] = useState("");
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (typeCounters > 0) {
      const calculateTheAccuracy = Math.round(
        (typedText.length / typeCounters) * 100
      );
      setAccuracy(calculateTheAccuracy);
    }
  }, [typedText, typeCounters]);
  useEffect(() => {
    if (inView) {
      if (!startTime) {
        setStartTime(Date.now());
      }

      feather.replace();

      const handleKeyDown = (event) => {
        setTypeCounters((prevCounter) => prevCounter + 1);
        const pressedKey = event.key.toUpperCase();

        const correctChar = AboutME[currentIndex]?.toUpperCase();

        const keyElement = document.getElementById(pressedKey);
        if (keyElement) {
          keyElement.classList.add("key--clicked");
          setTimeout(() => {
            keyElement.classList.remove("key--clicked");
          }, 300);
        }
        const elapsedTimeInMinutes = (Date.now() - startTime) / 1000 / 60;
        if (elapsedTimeInMinutes > 0) {
          const charactersTyped = typedText.length;
          const currentCpm = (charactersTyped / elapsedTimeInMinutes).toFixed(
            0
          );
          setCpm(currentCpm);
        }
        if (pressedKey === correctChar) {
          setCompo((prevCompo) => prevCompo + 1);

          setTypedText((prevText) => {
            const newText = prevText + pressedKey;
            return newText;
          });

          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          setCompo(0);
          setWronge(true);
          setTimeout(() => {
            setWronge(false);
          }, 400);
        }

        if (pressedKey === " ") {
          const x = document.querySelector(".keyboard");
          x.classList.add("spacebar-clicked");
          setTimeout(() => {
            x.classList.remove("spacebar-clicked");
          }, 100);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [currentIndex, inView]);

  const [isWorking, setIsWorking] = useState(true);

  const typingIntervalRef = useRef(null);

  const typeText = (fullText, totalDuration, setTypedText) => {
    const intervalTime = totalDuration / fullText.length;
    let currentIndex = 0;
    const startTime = performance.now();

    const type = (timestamp) => {
      const elapsedTime = timestamp - startTime;

      const charsToType = Math.floor(elapsedTime / intervalTime);

      if (charsToType > currentIndex) {
        setTypedText(fullText.slice(0, charsToType));
        currentIndex = charsToType;
      }

      if (currentIndex < fullText.length) {
        typingIntervalRef.current = requestAnimationFrame(type);
      } else {
        setTypedText(fullText);
      }
    };

    typingIntervalRef.current = requestAnimationFrame(type);
  };

  const stopTyping = () => {
    if (typingIntervalRef.current) {
      cancelAnimationFrame(typingIntervalRef.current);
    }
  };
  const handleClickSkip = () => {
    setIsWorking(false);

    const totalDuration = 7000;

    typeText(AboutME, totalDuration, setTypedText);

    setCompo(0);
    setTypeCounters(0);
    setAccuracy(0);
    setCurrentIndex(0);
    setCpm(0);
    setStartTime(null);
  };
  const handleClickRestart = () => {
    setCompo(0);
    setTypeCounters(0);
    setAccuracy(0);
    setWronge(false);
    setTypedText("");
    setCurrentIndex(0);
    setCpm(0);
    setStartTime(null);
  };
  const handleClickStart = () => {
    stopTyping();
    setTypeCounters(0);
    setAccuracy(0);
    setIsWorking(true);
    setTypedText("");
    setCompo(0);
    setCurrentIndex(0);
    setCpm(0);
    setStartTime(null);
  };
  return (
    <div
      ref={ref}
      className={`w-screen h-screen ${mode === "dark" ? "app" : "app2"} flex flex-col pb-8 pt-16  items-center`}
    >
      {isDevicePC && (
        <div className="h-fit  md:hidden lg:block w-[15%] p-2  absolute right-4">
          {" "}
          <div className="text-md text-center flex flex-col gap-5  justify-center items-center text-gray-300">
            {cpm !== 0 ? (
              <h1
                className={`${mode === "dark" ? "text-gray-200" : "text-zinc-950"}`}
              >
                {" "}
                Typing Speed: {Math.round(cpm / 6)} words/min
              </h1>
            ) : (
              <h1
                className={`${mode === "dark" ? "text-gray-200" : "text-zinc-950"}`}
              >
                Start Typing On The Keyboard
              </h1>
            )}
            {isWorking && (
              <h1
                className={`${mode === "dark" ? "text-gray-200" : "text-zinc-950"}`}
              >
                {" "}
                Typing Accuracy: {accuracy}%
              </h1>
            )}
            <div className="flex w-full items-center justify-center md:gap-4 lg:gap-10">
              {isWorking && (
                <div
                  onClick={handleClickRestart}
                  className="w-9 h-9 cursor-pointer"
                >
                  <img
                    className="w-9 h-auto"
                    src={`${mode === "dark" ? "/restart.svg" : "/restart2.svg"}`}
                    alt="reast"
                  />
                </div>
              )}
              {isWorking && (
                <div
                  onClick={handleClickSkip}
                  className="w-14 h-14 cursor-pointer"
                >
                  <img
                    className="w-14 h-auto"
                    src={`${mode === "dark" ? "/skip.svg" : "/skip2.svg"}`}
                    alt="reast"
                  />
                </div>
              )}
              {!isWorking && (
                <div
                  onClick={handleClickStart}
                  className="w-16 h-16 cursor-pointer"
                >
                  <img className="w-16 h-auto" src="key.svg" alt="reast" />
                </div>
              )}
            </div>
            {compo !== 0 && !wronge && (
              <div className="flex gap-2 items-center">
                <motion.div
                  className={`text-[${compo}/5]`}
                  initial={{
                    scale: 0.6,
                    opacity: 0,
                    rotate: -45,
                    color: "white",
                  }}
                  animate={{
                    scale: 2.5,
                    opacity: 1,
                    rotate: 360,
                    color: "red",
                  }}
                  exit={{
                    scale: 0.6,
                    opacity: 0,
                    rotate: -45,
                    color: "white",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 20,
                    duration: 0.5,
                    bounce: 0.4,
                  }}
                >
                  {compo}
                </motion.div>
                <div className="ml-2 text-sm text-green-500">✔ Correct!</div>
              </div>
            )}
          </div>
        </div>
      )}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className={`${mode === "dark" ? "text-gray-200" : "text-zinc-950"} text-2xl md:text-3xl`}
      >
        About Me
      </motion.h1>
      <div className=" h-full w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className={`text-lg ${isWorking ? "md:text-2xl" : "md:text-3xl"}   text-center w-[93%] lg:w-[60%] ${mode === "dark" ? "text-gray-200" : "text-zinc-950"} leading-relaxed`}
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity:
                  index < typedText.length ? 1 : mode === "dark" ? 0.5 : 0.7,
                color: mode === "dark" ? "#fffff4" : "#000000",
                scale: index < typedText.length ? 1.45 : 1,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
                scale: {
                  type: "spring",
                  stiffness: 150,
                  damping: 12,
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
      </div>

      <motion.div
        ref={ref}
        className={`md:hidden lg:block keyboard transition ${isDevicePC ? "block" : "hidden"} ${isWorking ? "block" : "hidden"} ${wronge ? "wrongKey" : ""} ${compo === 0 ? "compo" : ""} w-fit h-fit ${inView ? "block" : "hidden"}`}
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{
          opacity: isWorking ? 1 : 0,
          scale: isWorking ? 1 : 0.8,
          y: isWorking ? 0 : -20,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.8, 0.25, 1],
        }}
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
      {!isDevicePC && (
        <motion.h1
          animate={{
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.05, 1],
          }}
          transition={{
            opacity: { repeat: Infinity, duration: 5, ease: "easeInOut" },
            scale: { repeat: Infinity, duration: 5, ease: "easeInOut" },
          }}
          className={`text-opacity-85 text-sm ${mode === "dark" ? "text-gray-300" : "text-zinc-950"}`}
        >
          Sign in from your PC to try the typing speed test :)
        </motion.h1>
      )}
    </div>
  );
}
