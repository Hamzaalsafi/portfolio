import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function Gallery({ images, link }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const handleLinkClickLink = () => {
    window.open(link, "_blank");
  };

  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
  };

  // Start autoplay on component mount
  useEffect(() => {
    startAutoplay();

    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  // Scroll to gallery when it's in view
  const scrollRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
        }
      },
      { threshold: 0.5 }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, []);

  const handleBubbleClick = (index) => {
    setCurrentIndex(index);
    startAutoplay();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 1,
        ease: [0.68, -0.55, 0.27, 1.55],
      }}
      ref={scrollRef}
      className="relative rounded-xl flex items-center justify-center w-full h-full"
    >
      <motion.img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="h-auto cursor-pointer max-h-[300px] md:max-h-[355px] w-auto "
        onClick={handleLinkClickLink}
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="absolute bottom-4 left-1/2  transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <motion.div
            animate={{
              width: currentIndex === index ? "25px" : "12px",
              backgroundColor:
                currentIndex === index
                  ? "rgba(239, 68, 68, 1)"
                  : "rgba(209, 213, 219, 1)",
            }}
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.1,
            }}
            whileHover={{
              scale: currentIndex === index ? 1.3 : 1.1,
              width: currentIndex === index ? "20px" : "17px",
              boxShadow: "0px 0px 10px rgba(239, 68, 68, 0.5)",
            }}
            key={index}
            onClick={() => handleBubbleClick(index)}
            className={` h-2.5 cursor-pointer  duration-350 shadow-xl p-1 border-2 border-opacity-25 border-red-700 rounded-full ${currentIndex === index ? "w-7 " : "w-3"} bg-gray-300 transition-all`}
          ></motion.div>
        ))}
      </div>
    </motion.div>
  );
}
