import React, { useState, useEffect } from "react";

export function WaterAnimation() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const cnt = document.getElementById("count");
    const water = document.getElementById("water");

    const interval = setInterval(() => {
      setPercent((prevPercent) => {
        const newPercent = prevPercent + 1;

        water.style.transform = `translate(0, ${100 - newPercent}%)`;
        if (newPercent >= 100) {
          clearInterval(interval);
        }
        return newPercent;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="box">
      <div id="water" className="water">
        <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
          <use href="#wave" />
        </svg>
        <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
          <use href="#wave" />
        </svg>
      </div>
    </div>
  );
}
