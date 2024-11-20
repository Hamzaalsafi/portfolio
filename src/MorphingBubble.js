import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WaterAnimation } from "./WaterAnimation";
export const MorphingBubble = () => {
  const [isMouseUp, setIsMouseUp] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [disable, setDisable] = useState(false);
  const [image, setImage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    let timer;
    if (isMouseUp && startTime !== null) {
      timer = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        setTimeSpent(elapsedTime);

        if (elapsedTime >= 3.5) {
          setImage(!image);
        }
        if (elapsedTime >= 4) {
          setIsMouseUp(false);
          setDisable(true);

          setTimeout(() => {
            setDisable(false);
          }, 1000);
          clearInterval(timer);
        }
      }, 100);
    }

    return () => clearInterval(timer);
  }, [isMouseUp, startTime]);
  const handleTouchStart = (e) => {
    if (!disable) {
      e.preventDefault();
      setIsMouseUp(true);
      setStartTime(Date.now());
    }
  };

  const handleTouchEnd = () => {
    if (!disable) {
      setIsMouseUp(false);
      setTimeSpent(0);
    }
  };
  const handleMouseEnter = () => {
    if (!disable) {
      setIsMouseUp(true);
      setStartTime(Date.now());
    }
  };

  const handleMouseLeave = () => {
    if (!disable) {
      setIsMouseUp(false);
      setTimeSpent(0);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
      className=" relative"
    >
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className=" relative"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 50px rgba(194, 31, 36, 0.6)",
          backgroundColor: "#b40a11",
          transition: { duration: 0.5 },
        }}
        whileTap={{
          scale: 1.1,
          backgroundColor: "#d43f3f",
          boxShadow: "0px 0px 30px rgba(216, 54, 58, 0.6)",
          transition: { duration: 0.3 },
        }}
        animate={{
          borderRadius: [
            "46% 54% 50% 50%",
            "53% 46% 53% 40%",
            "52% 48% 48% 52%",
            "52% 46% 52% 48%",
            "50% 51% 52% 48%",
            "47% 54% 51% 49%",
            "46% 54% 50% 50%",
          ],

          scale: [1, 1.02, 1.02, 1, 1],
          backgroundColor: [
            "#8b0000",
            "#b22222",
            "#d43f3f",
            "#b22222",
            "#a00000",
            "#900000",
            "#b22222",
            "#8b0000",
          ],

          boxShadow: [
            "0px 0px 20px rgba(139, 0, 0, 0.6)",
            "0px 0px 30px rgba(178, 34, 34, 0.6)",
            "0px 0px 40px rgba(212, 63, 63, 0.6)",
            "0px 0px 30px rgba(178, 34, 34, 0.6)",
            "0px 0px 20px rgba(160, 0, 0, 0.6)",
            "0px 0px 20px rgba(144, 0, 0, 0.6)",
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        style={{
          width:
            window.innerWidth > 375
              ? (window.innerWidth / window.innerHeight) * 450 + "px"
              : "150px",
          height:
            window.innerWidth > 375
              ? (window.innerWidth / window.innerHeight) * 450 + "px"
              : "150px",
          maxHeight: 380,
          minHeight: 130,
          minWidth: 130,
          maxWidth: 380,
          position: "relative",
          cursor: "pointer",
          transition: "transform 0.3s",
          transformOrigin: "50% 50%",
          backgroundColor: "#b0c4e9",
          boxShadow: "0px 0px 20px rgba(176, 196, 233, 0.5)",
          borderRadius: "45% 55% 50% 50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {isMouseUp && <WaterAnimation />}

        {!image && (
          <motion.img
            key="image"
            className="pointer-events-none select-none rotate-[-10deg] relative top-4 right-1"
            draggable={false}
            src="/me.png"
            alt="me"
            style={{
              width: "99%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        )}
        {image && (
          <motion.img
            key="image2"
            className="pointer-events-none select-none rotate-[-10deg] relative top-3 left-4"
            draggable={false}
            src="/me2.png"
            alt="me"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
