import React, { useEffect, useState, useRef } from "react";
import feather from "feather-icons";
import { motion } from "framer-motion";
import { useModeContext } from "./DarkModeProvider";
import { useInView } from "react-intersection-observer";
const AboutME =
  "I am a Front-End Developer and UX/UI Designer with a solid background in creating user-friendly interfaces and applications. Currently studying Computer Engineering at Yarmouk University, I have developed problem-solving skills through competitive programming, with a Codeforces rating of 1550. I have experience in building projects, organizing programming competitions, and working well within team settings. I am also working on improving my backend development skills to become a full-stack developer.";
const rows = [
  [
    { label: "ESC", icon: "x", className: "key__esc", id: "ESCAPE" },
    { label: "! 1", className: "key__symbols", id: "1" },
    { label: "@ 2", className: "key__symbols", id: "2" },
    { label: "# 3", className: "key__symbols", id: "3" },
    { label: "$ 4", className: "key__symbols", id: "4" },
    { label: "% 5", className: "key__symbols", id: "5" },
    { label: "^ 6", className: "key__symbols", id: "6" },
    { label: "& 7", className: "key__symbols", id: "7" },
    { label: "* 8", className: "key__symbols", id: "8" },
    { label: "( 9", className: "key__symbols", id: "9" },
    { label: ") 0", className: "key__symbols", id: "0" },
    { label: "_ -", className: "key__symbols", id: "-" },
    { label: "+ =", className: "key__symbols", id: "=" },
    {
      label: "Delete",
      icon: "delete",
      className: "key__delete key__icon mainButtons",
      id: "BACKSPACE",
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
    { label: "{ [", className: "key__symbols", id: "[" },
    { label: "} ]", className: "key__symbols", id: "]" },
    { label: "| \\", className: "key__symbols key__oneandhalf", id: "\\" },
  ],
  [
    { label: "CapsLk", className: "key__caps mainButtons", id: "CAPSLOCK" },
    { label: "A" },
    { label: "S" },
    { label: "D" },
    { label: "F" },
    { label: "G" },
    { label: "H" },
    { label: "J" },
    { label: "K" },
    { label: "L" },
    { label: ": ;", id: ";" },
    { label: "\" '", id: "'" },
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
    { label: "> .", className: "key__symbols", id: "," },
    { label: "< .", className: "key__symbols", id: "." },
    { label: "? /", className: "key__symbols", id: "/" },
    { label: "↑", icon: "arrow-up-circle" },
    { label: "Up", icon: "arrow-up", className: "key__arrow", id: "ARROWUP" },
    { label: "Trash", icon: "trash-2" },
  ],
  [
    {
      label: "Ctrl",
      className: "key__bottom-funct mainButtons",
      id: "CONTROL",
    },
    { label: "Win", className: "key__bottom-funct mainButtons", id: "META" },
    { label: "Alt", className: "key__bottom-funct mainButtons", id: "ALT" },
    { label: "Space", className: "key__spacebar", id: " " },
    { label: "Alt", className: "mainButtons" },
    { label: "Fn", className: "mainButtons" },
    {
      label: "←",
      icon: "arrow-left",
      className: "key__arrow",
      id: "ARROWLEFT",
    },
    {
      label: "↓",
      icon: "arrow-down",
      className: "key__arrow",
      id: "ARROWDOWN",
    },
    {
      label: "→",
      icon: "arrow-right",
      className: "key__arrow",
      id: "ARROWRIGHT",
    },
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
        const clickSound = new Audio("/typing-sound.mp3");
        const worngSound = new Audio("/vibrating.mp3");
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
          clickSound.play();
          setTypedText((prevText) => {
            const newText = prevText + pressedKey;
            return newText;
          });

          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          if (
            pressedKey !== "SHIFT" &&
            pressedKey !== "CAPSLOCK" &&
            pressedKey !== "CONTROL" &&
            pressedKey !== "ALT" &&
            pressedKey !== "FN" &&
            pressedKey !== "ENTER" &&
            pressedKey !== "BACKSPACE" &&
            pressedKey !== "META" &&
            pressedKey !== "TAB" &&
            pressedKey !== "ESCAPE" &&
            pressedKey !== "ARROWUP" &&
            pressedKey !== "ARROWDOWN" &&
            pressedKey !== "ARROWRIGHT" &&
            pressedKey !== "ARROWLEFT"
          ) {
            worngSound.play();
            setCompo(0);
            setWronge(true);
            setTimeout(() => {
              setWronge(false);
            }, 400);
          }
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
                id={key.id || key.label.toUpperCase()}
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
          className={`text-opacity-85 mb-10 text-sm ${mode === "dark" ? "text-gray-300" : "text-zinc-950"}`}
        >
          Sign in from your PC to try the typing speed test :)
        </motion.h1>
      )}
    </div>
  );
}
