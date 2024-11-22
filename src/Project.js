import { useModeContext } from "./DarkModeProvider";
import { lazy } from "react";
const ProjectCard = lazy(() => {
  return import("./ProjectCard");
});
let projects = [
  {
    title: "KittyTask",
    title2: "Streamlined Task Management, Inspired by Trello",
    description:
      "KittyTask brings task management to a new level with real-time collaboration, fully customizable boards, and smooth, intuitive animations. Experience powerful drag-and-drop functionality in a user-friendly interface.",
    keyFeatures: [
      "Real-time collaboration",
      "Smooth, interactive animations",
      "Drag-and-drop functionality",
      "Fully customizable boards",
      "Intuitive, user-friendly interface",
      "Fast and responsive design",
    ],
    tooTip: ["React", "Tailwind", "CSS", "Firebase", "Vite", "Github"],
    ToolTipSvg: [
      "/react.svg",
      "/tailwind.png",
      "/css.svg",
      "/firebase.svg",
      "/vite.png",
      "/github.svg",
    ],
    macImages: [
      "/KittyTask1.png",
      "/KittyTask2.png",
      "/kittyTask3.png",
      "/kittyTask4.png",
      "/kittyTask5.png",
    ],
    phoneImages: [
      "/kittyTaskPhone2.png",
      "/kittyTaskPhone1.png",
      "/kittyTaskPhone3.png",
    ],
    link: "https://hamzaalsafi.github.io/KittyTask2/",
    gitHubLink: "https://github.com/Hamzaalsafi/KittyTask2",
  },
  {
    title: "Share the Giving",
    title2: "Building a University Resource Hub for the Future",
    description:
      "A collaborative platform where students and faculty contribute valuable university resources, stored in a database to support the creation of a comprehensive platform for students, providing access to all university resources.",
    keyFeatures: [
      "Infinite scroll leaderboard ",
      "Real-time stats on donors, materials covered, and donation count",
      "User-friendly entry selection",
      "Comprehensive forms for selecting specialization, subject, and resource type",
      "Modern, responsive, and engaging design",
    ],
    tooTip: ["React", "Tailwind", "CSS", "Supabase", "Bootstrap", "Github"],
    ToolTipSvg: [
      "/react.svg",
      "/tailwind.png",
      "/css.svg",
      "/Supabase.svg",
      "/Bootstrap.svg",
      "/github.svg",
    ],
    macImages: ["/shark1.png", "/shark2.png", "/shark3.png", "/shark4.png"],
    phoneImages: [
      "/sharkphone1.PNG",
      "/sharkphone5.PNG",
      "/sharkphone2.PNG",
      "/sharkphone3.PNG",
      "/sharkphone4.PNG",
    ],
    link: "https://sharikataa.vercel.app/",
    gitHubLink: "https://github.com/Hamzaalsafi/-",
  },
  {
    title: "Amazon Clone",
    title2: "Building a Fully Functional E-Commerce Experience",
    description:
      "This project is a replica of Amazon’s e-commerce platform, designed to offer a smooth shopping experience with dynamic product listings, user accounts, and a responsive design. The clone ensures fast, secure updates",
    keyFeatures: [
      "Identical UI to Amazon A user-friendly design",
      "Fully Responsive: Works seamlessly for all devices.",
      "User Accounts Each user has a personalized cart and wish list",
      "Dynamic Product Listings, Easy updates without code changes.",
      "Filters & Detailed Product Pages",
    ],
    tooTip: ["React", "CSS", "Firebase", "Github"],
    ToolTipSvg: ["/react.svg", "/css.svg", "/firebase.svg", "/github.svg"],
    macImages: [
      "/amazon1.png",
      "/amazon2.png",
      "/amazon3.png",
      "/amazon4.png",
      "/amazon5.png",
      "/amazon6.png",
      "/amazon7.png",
    ],
    phoneImages: [
      "/amazoniphone1.png",
      "/amazoniphone2.png",
      "/amazoniphone4.png",
      "/amazoniphone5.png",
      "/amazoniphone6.png",
      "/amazoniphone7.png",
      "/amazoniphone8.png",
    ],
    link: "https://hamzaalsafi.github.io/Amazon/",
    gitHubLink: "https://github.com/Hamzaalsafi/Amazon",
  },
  {
    title: "Interactive Drawing Tool",
    title2: "Intuitive Digital Art Creation, Built for All Devices",
    description:
      "Interactive Drawing Tool takes the drawing experience to a new level with a feature-rich interface designed for artists and creatives. Enjoy smooth animations, realistic tools, and full customization options, all crafted to deliver a seamless experience.",
    keyFeatures: [
      "Realistic Tools",
      "Shape Drawer",
      "Dynamic Text:Add, move, with drag-and-drop ",
      "Undo/Redo",
      "Save & Delete",
      "Smooth Animations & User-Friendly Interface",
    ],
    tooTip: ["HTML", "CSS", "javascript", "Github"],
    ToolTipSvg: ["/HTML.svg", "/css.svg", "/javascript.svg", "/github.svg"],
    macImages: ["/drawing1.png", "/drawing2.png", "/drawing3.png"],
    phoneImages: ["/draingphone.png"],
    link: "https://drawing-five-theta.vercel.app/",
    gitHubLink: "https://github.com/Hamzaalsafi/Interactive-Drawing-Tool",
  },
];

export default function Project() {
  const { mode } = useModeContext();
  return (
    <div
      className={`w-screen   py-16  flex items-start  justify-center ${mode === "dark" ? "bg-zinc-900" : "bg-zinc-300"}`}
    >
      <div className=" max-w-[1000px] px-3 md:p-0 w-screen  flex-col    justify-start items-center  ">
        <div className="waviy">
          {"Projects".split("").map((char, index) => (
            <span
              className={`${mode === "dark" ? "text-gray-200 select-none" : "text-zinc-950"} cursor-pointer `}
              key={index}
              style={{ "--i": index + 1 }}
            >
              {char}
            </span>
          ))}
        </div>
        <div
          className={`${mode !== "dark" ? "text-zinc-900" : "text-zinc-200"} h-full w-full  pt-5 gap-7 md:gap-14  items-center flex flex-col`}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
