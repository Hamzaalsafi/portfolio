import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useModeContext } from "./DarkModeProvider";
import Tooltip from "@mui/material/Tooltip";
import { useInView } from "react-intersection-observer";
let frontEnd = {
  tooTip: [
    "HTML",
    "CSS",
    "Javascript",
    "React",
    "Vite",
    "Tailwind",
    "Bootstrap",
    "Redux",
    "Figma",
    "Photoshop",
  ],
  ToolTipSvg: [
    "/HTML.svg",
    "/css.svg",
    "/javascript.svg",
    "/react.svg",
    "/vite.png",
    "/tailwind.png",
    "/bootstrap.svg",
    "/redux.svg",
    "/figma.svg",
    "/photoshop.svg",
  ],
};
let Backend = {
  tooTip: ["Firebase", "Supabase", "SQL", "Git", "GitHub"],
  ToolTipSvg: [
    "/firebase.svg",
    "/supabase.svg",
    "/sql.svg",
    "/git.svg",
    "github.svg",
  ],
};

export default function Skills({ SkillsRef }) {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const handleTooltipClick = (tooltipName) => {
    if (activeTooltip === tooltipName) {
      setActiveTooltip(null);
    } else {
      setActiveTooltip(tooltipName);
    }
  };
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const mouseRef = useRef({ x: 70, y: 70 });
  const [animatedPosition, setAnimatedPosition] = useState({ x: 70, y: 70 });
  const animationRef = useRef(null);
  const [blur, setBlur] = useState(false);

  const handleMouseMove = (event) => {
    const skills = SkillsRef.current?.getBoundingClientRect();

    mouseRef.current = {
      x: event.clientX,
      y: event.clientY - skills.top,
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

  const { mode } = useModeContext();
  return (
    <div
      onMouseMove={handleMouseMove}
      ref={ref}
      className={`w-screen nono  px-2 relative h-screen ${mode === "dark" ? "app" : "app2"} overflow-hidden justify-center app flex flex-col items-center`}
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
          filter: `blur(${blur ? 2.5 : 0}px)`,
          opacity: `${blur ? 0.5 : 1}`,
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
      <div className=" h-screen absolute   flex justify-center pt-14 items-start">
        <svg
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`svgoo2    ${inView ? "opacity-100" : "hidden"} z-10`}
          width="205"
          height="93"
          viewBox="0 0 205 93"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.1996 60.0353C39.6051 57.7999 42.9474 56.5004 44.8782 54.7777C51.4683 48.8982 43.3786 44.7412 37.3066 46.9242C32.3061 48.722 27.6096 52.0649 24.0693 56.0057C20.5101 59.9674 23.2417 60.7674 27.2065 62.1101C32.6742 63.9617 48.0095 70.0653 41.2582 77.9067C37.6787 82.0642 20.3203 91.3656 17.3732 82.1866C15.9784 77.8426 20.9161 74.3875 24.0911 72.6282C30.6331 69.0032 38.3014 67.9137 45.4773 66.1777C51.0452 64.8308 57.2267 63.4746 61.7225 59.6752C65.7431 56.2774 67.8775 50.7421 69.839 46.0029C71.5757 41.8069 72.9234 37.4053 73.9358 32.98C74.0909 32.3019 74.8798 27.587 74.8602 28.3528C74.7578 32.3603 73.673 36.3883 73.1398 40.3517C72.1198 47.9344 70.7927 55.2697 68.8503 62.6746C67.3768 68.2918 66.6147 74.0884 64.9831 79.6598C64.8934 79.9662 62.7526 85.8634 62.4966 84.2863C62.0406 81.4774 63.126 78.4464 64.1124 75.8805C66.7622 68.9882 70.9598 62.7288 75.0334 56.6141C80.0336 49.1086 86.1641 38.1595 94.9669 34.4277C96.8177 33.6431 98.8461 33.3106 98.789 35.9108C98.6717 41.2497 94.9545 46.7708 91.6223 50.654C88.2916 54.5355 83.9293 57.6424 79.0033 59.1346C78.4396 59.3054 71.0584 60.942 72.0807 58.3147C72.516 57.1959 74.7198 57.7699 75.4432 58.033C79.107 59.3651 80.2195 62.8944 80.6078 66.4451C81.4485 74.1329 88.4707 76.1715 95.3325 74.2573C103.714 71.919 108.832 65.7881 110.812 57.4462C110.898 57.0872 111.358 53.5932 111.046 54.0673C109.359 56.6361 108.468 59.9359 107.81 62.8923C106.794 67.4624 103.923 76.4723 111.806 74.7656C121.695 72.6247 129.496 63.3747 134.444 55.2392C135.464 53.5613 146.013 32.01 140.638 31.6444C137.728 31.4466 135.773 36.3771 134.876 38.3415C131.706 45.2821 129.027 52.6425 127.237 60.0645C126.533 62.9835 124.7 68.47 126.682 71.2575C128.142 73.3115 132.188 72.618 134.239 72.2408C144.552 70.3445 149.808 62.8524 154.463 54.0496C156.767 49.6918 158.337 44.8967 160.311 40.3799C161.807 36.9557 163.262 33.5005 164.182 29.8691C164.543 28.4455 164.975 25.8262 162.553 26.6427C158.503 28.0084 155.872 34.3794 154.414 37.8774C152.195 43.2026 150.854 48.858 150.548 54.6183C150.378 57.8219 149.915 62.0877 151.449 65.0679C152.178 66.4823 153.839 69.0261 155.641 69.1217C159.372 69.3196 164.589 65.6459 167.725 63.9514C172.087 61.5944 176.053 58.4335 179.738 55.1362C182.419 52.7378 188.531 47.4472 187.534 43.1438C186.892 40.3762 181.949 41.1328 180.234 42.1465C176.056 44.615 178.043 50.0596 179.992 53.2631C181.891 56.3834 184.954 59.4726 184.777 63.4007C184.578 67.8169 180.731 70.0019 176.868 70.782C174.358 71.2888 169.43 72.6549 167.126 71.0339C165.12 69.6229 170.163 65.5161 171.096 64.6284"
            stroke={` ${mode === "dark" ? "#e5e7eb" : "#1E1E1E"} `}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.310053"
            d="M39.6893 57.4615C41.0742 56.4082 48.2077 49.3756 44.7997 48.4075C43.1678 47.9438 40.643 48.7339 39.0948 49.2504C36.6935 50.0514 34.1129 50.6397 32.3216 52.54C30.9085 54.039 28.98 55.1253 27.6951 56.6886C27.464 56.9699 26.2396 59.2295 25.8819 59.2295C24.559 59.2295 26.3484 57.1231 26.7373 56.7625"
            stroke="#1E1E1E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.310053"
            d="M40.5528 69.8997C40.775 70.105 40.8364 70.0728 40.4419 70.0953C38.4031 70.2116 36.3972 70.6805 34.4306 71.2029C30.2093 72.324 26.215 74.599 23.0388 77.5802C21.8023 78.7408 21.1699 79.6543 20.3177 81.0773C20.2352 81.215 19.5736 82.3726 19.9243 81.6063C20.2729 80.8446 20.5843 80.3288 21.2045 79.7153C24.6905 76.2669 29.4727 73.8723 33.9354 71.9555C38.6557 69.9282 43.8083 69.3379 48.8438 68.7663C52.8708 68.3091 56.979 65.9928 60.3013 63.7655C63.821 61.406 66.6026 58.2506 69.4055 55.0818C69.8033 54.6321 72.0124 50.8584 70.8609 53.2882"
            stroke="#1E1E1E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.310053"
            d="M96.5043 35.7515C100.707 31.4217 87.671 43.975 83.3556 48.1921C80.3383 51.1408 72.9704 61.4845 75.3974 58.0337"
            stroke="#1E1E1E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.310053"
            d="M77.4396 28.282C77.0018 28.3193 76.9476 32.9645 76.9193 33.3805C76.6269 37.6871 75.7869 41.9228 74.9183 46.1414C73.5727 52.6764 72.1604 59.2056 70.935 65.7651C69.9429 71.0751 68.7119 76.2339 67.5116 81.4803C67.3515 82.1797 66.9136 83.2647 66.9136 83.9413"
            stroke="#1E1E1E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.310053"
            d="M73.6704 61.289C75.3229 61.6278 76.9217 61.1779 77.7461 63.1349C78.3915 64.6669 78.4475 66.4173 78.9416 68.0022C79.4092 69.5023 80.08 70.8715 80.4434 72.4115C81.3195 76.125 84.3092 78.3256 88.0851 78.0229C92.1051 77.7006 96.7783 75.6849 100.197 73.6147C101.946 72.5554 103.764 71.5154 105.189 70.0288C105.522 69.6807 106.603 68.0708 106.347 69.3895C106.043 70.9547 103.847 76.2076 106.055 77.0511C109.131 78.2257 113.434 76.9037 116.272 75.7289C121.907 73.3966 125.663 69.9562 127.888 64.378C129.438 60.4941 130.802 56.3954 131.82 52.3403C133.11 47.1969 132.799 41.846 135.733 37.2045C136.39 36.1651 140.495 31.1204 142.235 32.9462C144.685 35.5177 142.915 39.6697 141.785 42.4748C139.095 49.1506 134.733 54.4116 130.408 60.0587C128.596 62.4249 127.033 64.7454 126.312 67.6443C125.92 69.2199 125.424 71.3557 126.666 72.6502C129.84 75.956 135.796 75.7216 139.835 74.3724C142.732 73.4046 145.406 72.428 147.411 70.0014C149.213 67.8197 150.369 64.9799 151.399 62.3646C152.516 59.5279 153.343 56.4223 153.983 53.4489C154.709 50.0764 154.706 46.8999 154.897 43.4806C155.062 40.5338 155.312 37.6132 156.889 35.0146C158.242 32.7845 160.002 29.6595 162.364 28.3894C165.795 26.5442 166.356 30.5361 165.725 33.1133C164.83 36.7655 164.61 40.5419 162.725 43.8722C160.661 47.5215 158.227 50.9671 155.817 54.3925C153.476 57.7183 150.808 60.8296 148.525 64.1943C147.554 65.6246 146.851 67.1951 146.004 68.6953C145.544 69.5094 144.778 70.4551 144.829 71.45C144.906 72.9342 148.909 71.133 149.385 70.7799C150.308 70.0965 151.054 68.3926 152.315 68.3277C153.475 68.268 155.158 70.541 156.535 70.8214C158.644 71.251 161.114 70.8908 162.831 69.5502C164.467 68.2725 166.07 66.2129 168.01 65.3852C169.818 64.6133 170.919 63.7125 172.431 62.383C174.809 60.2916 177.549 58.7103 180.015 56.7288C183.324 54.0689 188.145 49.864 189.17 45.5679C189.306 44.9943 189.969 43.2813 189.476 42.7771C189.019 42.3086 187.792 42.2321 187.163 42.1327C185.508 41.871 182.962 42.4994 181.586 43.438C180.597 44.1131 179.341 46.8517 179.441 48.0338C179.572 49.5881 180.424 52.0753 181.601 53.1352C183.562 54.9008 186.471 58.2528 186.905 60.927C187.622 65.3328 185.69 68.9756 182.471 71.8208C180.157 73.8662 177.395 75.406 174.256 75.3565C171.002 75.3053 169.656 75.1262 167.327 72.7478C166.146 71.5413 164.942 69.8646 164.417 68.1899"
            stroke="#1E1E1E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M113.624 32.4225C113.409 32.2519 113.278 32.0885 113.312 31.7992C113.322 31.7127 113.42 33.8637 113.421 34.2708C113.428 37.2185 113.044 40.1237 112.952 43.0628C112.923 43.9968 113.052 45.012 112.797 45.9221C112.736 46.1406 112.488 45.6786 112.488 45.9731"
            stroke="#E6B221"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M108.997 38.8538C112.536 38.8936 123.154 38.8938 119.615 38.8938C118.305 38.8938 116.984 39.2612 115.662 39.3005C114.183 39.3443 112.703 39.3396 111.224 39.3814C110.491 39.4021 109.988 39.4746 110.91 39.1669"
            stroke="#FFCD29"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M112.138 36.2352C112.677 34.8143 112.499 36.0369 111.759 36.7535C111.291 37.207 109.231 38.2679 110.405 38.0212C112.964 37.4838 114.223 35.1044 114.468 32.4978C114.579 31.321 114.414 31.043 114.641 32.4568C114.851 33.7652 114.887 35.94 115.809 36.9793C115.886 37.0658 116.883 37.6673 116.828 37.6809C115.349 38.0446 114.619 38.8407 113.994 40.275C113.487 41.4397 113.752 42.6045 113.496 43.7965C113.265 44.8733 113.33 43.4254 113.237 43.0882C112.875 41.7673 110.575 38.3371 111.008 39.6365C111.427 40.8924 112.341 41.942 112.687 43.3551C112.95 44.4318 113.071 44.4568 113.4 43.5659C114.135 41.5737 116.358 40.603 118.005 39.4688C118.314 39.2556 117.366 39.9013 117.22 39.9843C116.624 40.3241 113.864 42.8389 114.794 42.0801"
            stroke="#FFCD29"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M197.241 28.373C197.3 28.0921 197.813 26.2007 197.82 27.1417C197.833 29.0029 197.598 31.4933 196.712 33.1654"
            stroke="#FFCD29"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M195.387 29.4109C195.227 29.6499 195.961 29.4282 196.248 29.4291C197.426 29.4329 198.6 29.4706 199.776 29.5274"
            stroke="#E6B221"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.8718 29.0394C14.8875 28.7578 15.0113 28.34 15.0126 28.9253C15.0166 30.6286 14.895 32.3233 14.8718 34.0248"
            stroke="#FFCD29"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.8423 30.4668C13.438 31.4695 16.0807 30.9296 17.0229 30.8565"
            stroke="#E6B221"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.409524"
            d="M63.9177 13.8828C64.3056 14.0919 63.0441 14.0088 62.6164 14.1151C60.1199 14.7355 58.2029 16.2234 57.3134 18.6675C55.7317 23.0135 58.982 25.213 62.6359 26.3725C63.1007 26.52 66.2148 26.8209 64.9692 25.8182C62.9582 24.1991 61.458 22.2423 60.886 19.655C60.4115 17.509 62.7291 16.1617 64.2868 15.1918C64.6665 14.9553 63.7805 15.1543 63.6445 15.2401C61.2339 16.7598 59.2448 20.0116 60.0732 22.923C60.3936 24.049 61.1465 24.9156 62.2539 25.2707C62.3472 25.3006 63.4544 25.5853 63.0677 25.4331C60.9179 24.5869 58.2769 22.6264 58.6619 20.0315C58.892 18.4801 61.8992 14.3719 63.717 14.1573C65.0636 13.9984 66.7699 14.073 67.9964 14.6467C68.2603 14.7702 69.2404 15.7998 68.6646 14.9939C67.0315 12.7083 64.4108 15.4167 63.6226 16.9968C62.5005 19.2467 61.302 22.0098 62.4535 24.5288C62.7542 25.1866 64.5138 26.5089 63.8767 26.1665C61.7757 25.0375 61.5538 19.9345 62.3869 18.1779C63.0922 16.6908 65.0207 15.8696 66.5403 15.5058C67.4069 15.2983 67.9013 15.8636 68.7026 16.0261C69.1584 16.1186 66.6389 16.2788 66.1437 16.38C64.5847 16.6985 63.6937 17.885 62.9731 19.2223C62.2041 20.6493 61.6821 22.5487 61.9852 24.1707C62.0522 24.5291 62.1546 24.9697 62.0888 24.3093C61.9458 22.8726 61.2593 21.5711 61.1797 20.0931C61.0621 17.9076 62.0601 16.5865 64.0372 15.7548C65.1303 15.2951 65.1741 16.0731 66.0984 16.0878C66.8289 16.0994 66.6591 14.9826 66.6082 14.4691C66.4714 13.0861 63.2032 13.3016 62.3826 13.7149C61.0598 14.3811 64.3038 13.5466 64.9271 13.5344C65.8953 13.5155 66.8714 13.5797 67.7706 13.9785C68.1563 14.1495 68.9735 15.1618 68.667 14.8719C67.2465 13.5286 64.9271 13.278 63.0842 13.8415C60.8983 14.5099 59.0138 17.2591 58.2548 19.2676C57.319 21.7439 57.3543 24.1124 59.4069 26.016C61.066 27.5547 62.5977 27.3296 64.5004 27.062"
            stroke={` ${mode === "dark" ? "#d4d7db" : "#1E1E1E"} `}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.244444"
            d="M168.837 7C168.49 7.72532 165.914 8.52606 165.281 8.85482C159.45 11.8833 153.392 14.4635 147.411 17.1691C143.117 19.1118 139.189 21.8018 134.972 23.8939C133.624 24.5626 131.791 26.0693 130.294 26.3652C130.073 26.4089 130.733 26.4975 130.958 26.4975"
            stroke={` ${mode === "dark" ? "#d4d7db" : "#1E1E1E"} `}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.244444"
            d="M46.5592 23.1509C46.4101 24.173 44.8634 24.834 44.1018 25.2612C40.8576 27.0811 37.7872 29.108 34.6108 31.0387C29.0996 34.3887 23.7155 37.9029 18.3358 41.4521C16.524 42.6473 14.8012 43.9872 13.0117 45.2173C12.3259 45.6888 10.754 47.5239 11.0328 46.7398C11.0849 46.5932 11.2715 46.4794 11.4196 46.4794"
            stroke={` ${mode === "dark" ? "#d4d7db" : "#1E1E1E"} `}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.244444"
            d="M99.2514 16.0531C96.8337 16.1998 99.3703 13.0676 100.514 14.501C101.272 15.4509 99.778 18.2004 98.5123 17.8626C97.3108 17.542 97.6583 14.945 98.7681 14.656C100.737 14.1431 101.064 17.0634 99.4473 17.7963C97.6484 18.6116 96.2221 16.5246 97.6486 15.1512C99.1681 13.6883 101.472 14.9423 100.269 16.9672C99.7769 17.7964 98.06 18.5905 97.9647 17.1493"
            stroke="#0D99FF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.244444"
            d="M97.2607 16.013C96.6108 16.0536 91.7779 17.6005 92.3679 18.1155C92.893 18.5737 94.8091 17.5219 95.308 17.3537C97.3627 16.6612 99.4686 16.1228 101.532 15.4534C102.058 15.2829 104.905 13.5959 103.023 14.3067C101.786 14.7738 96.1023 17.4638 95.3088 16.308"
            stroke="#0D99FF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            opacity="0.244444"
            d="M99.2516 15.9948C99.0419 16.27 98.0567 16.8487 97.7275 16.5245C97.2062 16.0109 99.4243 14.1508 99.4599 16.0183C99.4878 17.4826 97.004 19.5853 97.4219 17.1237C97.5923 16.1202 98.6932 14.2175 98.7272 16.2279"
            stroke="#0D99FF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            opacity="0.244444"
            d="M180.587 18.9883C180.587 18.1767 180.404 16.514 181.674 16.5702C183.881 16.6679 182.386 21.0689 181.299 19.7162C179.941 18.0275 183.24 15.3286 183.221 18.3801C183.211 20.1561 181.077 20.316 181.427 18.3401"
            stroke="#0D99FF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className=" justify-center  mt-14  flex-col"></div>
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex z-10 mb-5 md:pb-14 border-red-700 border-2 border-opacity-50 p-2 pb-4 md:p-4 m:pb-14  max-w-[1000px] flex-col  md:mb-10 px-4 items-center justify-center h-fit rounded-xl  ${mode === "dark" ? "darkSkillsBox" : "lightSkillsBox"} ${inView ? "donation" : ""} w-full ${inView ? "opacity-100" : "opacity-15"}`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: inView ? 1 : 0.15,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      >
        <h1
          className={`${mode === "dark" ? "text-gray-200" : "text-zinc-950"} text-2xl pb-4`}
        >
          Front-End & UI/UX
        </h1>
        <div className="flex gap-6 justify-center items-center  flex-wrap ">
          {frontEnd.tooTip.map((title, index) => (
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
                tooltip: mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                arrow: mode === "dark" ? "custom-arrow" : "custom-arrow2",
              }}
            >
              <motion.div
                whileHover={{
                  scale: 1.15,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                initial={{ opacity: 0.01 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.01 }}
                onClick={() => handleTooltipClick(title)}
                className="w-12 h-12  md:w-14 md:h-14 cursor-pointer p-0.5 donation rounded-full flex items-center justify-center"
              >
                <img
                  className={`md:h-12 h-10 w-10 p-0.5 md:w-12 ${title === "Javascript" ? "rounded-full" : ""}`}
                  src={frontEnd.ToolTipSvg[index]}
                  alt={`${title} Logo`}
                />
              </motion.div>
            </Tooltip>
          ))}
        </div>
      </motion.div>
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex border-red-700 border-2 border-opacity-50 z-10 p-2 pb-4 md:p-4 m:pb-14   max-w-[1000px] flex-col   px-4 items-center justify-center h-fit rounded-xl  ${mode === "dark" ? "darkSkillsBox" : "lightSkillsBox"} ${inView ? "donation" : ""} w-full ${inView ? "opacity-100" : "opacity-15"}`}
        initial={{ opacity: 0.01 }}
        animate={{
          opacity: inView ? 1 : 0.15,
          transition: { duration: 0.4, ease: "easeInOut" },
        }}
      >
        <h1
          className={`${mode === "dark" ? "text-gray-200" : "text-zinc-950"} text-2xl pb-4`}
        >
          Back-End
        </h1>
        <div className="flex gap-6 justify-center items-center  flex-wrap ">
          {Backend.tooTip.map((title, index) => (
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
                tooltip: mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                arrow: mode === "dark" ? "custom-arrow" : "custom-arrow2",
              }}
            >
              <motion.div
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
                onClick={() => handleTooltipClick(title)}
                className={`w-12 h-12  md:w-14 md:h-14  cursor-pointer p-0.5 donation rounded-full flex items-center justify-center`}
              >
                <img
                  className={`w-10 h-10  md:w-12 md:h-12 p-0.5  ${title === "GitHub" && mode === "dark" ? "bg-slate-50 rounded-full" : ""}`}
                  src={Backend.ToolTipSvg[index]}
                  alt={`${title} Logo`}
                />
              </motion.div>
            </Tooltip>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
