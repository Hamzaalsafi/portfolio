import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Function to start the autoplay
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
          entry.target.scrollIntoView({ behavior: 'smooth' });
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
    startAutoplay(); // Restart autoplay after manual interaction
  };

  // Function to handle next/prev buttons
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    startAutoplay(); // Restart autoplay after manual interaction
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    startAutoplay(); // Restart autoplay after manual interaction
  };

  return (
    <motion.div
    initial={{ x: '100%', opacity: 0, scale: 0.9 }}
    animate={{ x: 0, opacity: 1, scale: 1 }}
    exit={{ x: '-100%', opacity: 0, scale: 1.1 }}
    transition={{
      type: 'spring',
      stiffness: 300,
      damping: 25,
      duration: 1.2,
      ease: [0.68, -0.55, 0.27, 1.55], // Smooth easing
    }}
    ref={scrollRef} className="relative rounded-xl overflow-hidden w-full h-full">
      {/* Image display with Framer Motion for transition */}
      <motion.img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="h-full w-full object-cover object-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }} // Fade in transition
      />

      {/* Bubble navigation */}
      <div className="absolute bottom-4 left-1/2  transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleBubbleClick(index)}
            className={` h-3  duration-350 shadow-xl rounded-full ${currentIndex === index ? 'w-9 ' : 'w-3'} bg-gray-300 transition-all`}
          ></button>
        ))}
      </div>

     
    </motion.div>
  );
}
