import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import  {useModeContext}  from './DarkModeProvider';
import Tooltip from '@mui/material/Tooltip';
import {Gallery} from './Gallery'
import {ProjectCard} from './ProjectCard';
let projects=[
  {

    title:'KittyTask',
    title2:"Streamlined Task Management, Inspired by Trello",
    description:'KittyTask brings task management to a new level with real-time collaboration, fully customizable boards, and smooth, intuitive animations. Experience powerful drag-and-drop functionality in a user-friendly interface.',
    keyFeatures:[
      'Real-time collaboration',
      'Smooth, interactive animations',
      'Drag-and-drop functionality',
      'Fully customizable boards',
      'Intuitive, user-friendly interface',
      'Fast and responsive design'
    ],
    tooTip:[
      "React",
      "Tailwind",
      "CSS",
      "Firebase",
      "Vite"
    ],
    ToolTipSvg:[
      "/react.svg",
      "/tailwind.png",
      "/css.svg",
      "/firebase.svg",
      "/vite.png"
    ],
    macImages:[
      "/kittyTask1.png",
      "/kittyTask2.png",
      "/kittyTask3.png",
      "/kittyTask4.png",
      "/kittyTask5.png"
    ],
    phoneImages:[
      "/kittyTaskPhone2.png",
      "/kittyTaskPhone1.png",
      "/kittyTaskPhone3.png"
    ],
    link:'https://hamzaalsafi.github.io/KittyTask2/'
  },
  {
    title:'Share the Giving',
    title2:"Building a University Resource Hub for the Future",
    description:'A collaborative platform where students and faculty contribute valuable university resources, stored in a database to support the creation of a comprehensive platform for students, providing access to all university resources.',
    keyFeatures:[
      'Infinite scroll leaderboard ',
      'Real-time stats on donors, materials covered, and donation count',
      'User-friendly entry selection',
      'Comprehensive forms for selecting specialization, subject, and resource type',
      'Modern, responsive, and engaging design'
    ],
    tooTip:[
      "React",
      "Tailwind",
      "CSS",
      "supabase",
      "bootstrap",
    ],
    ToolTipSvg:[
      "/react.svg",
      "/tailwind.png",
      "/css.svg",
      "/Supabase.svg",
      "/Bootstrap.svg"
    ],
    macImages:[
      "/shark1.png",
      "/shark2.png",
      "/shark3.png",
      "/shark4.png",
  
    ],
    phoneImages:[
      "/sharkphone1.png",
      "/sharkphone5.png",
      "/sharkphone2.png",
      "/sharkphone3.png",
      "/sharkphone4.png",

    ],
    link:'https://sharikataa.vercel.app/'
  },
  {

    title:'Interactive Drawing Tool',
    title2:"Intuitive Digital Art Creation, Built for All Devices",
    description:'Interactive Drawing Tool takes the drawing experience to a new level with a feature-rich interface designed for artists and creatives. Enjoy smooth animations, realistic tools, and full customization options, all crafted to deliver a seamless experience.',
    keyFeatures:[
      'Realistic Tools',
      'Shape Drawer',
      'Dynamic Text:Add, move, with drag-and-drop ',
      'Undo/Redo',
      'Save & Delete',
      'Smooth Animations & User-Friendly Interface'
    ],
    tooTip:[
      "HTML",
      "CSS",
      "javascript",
   
    ],
    ToolTipSvg:[
      "/HTML.svg",
      "/css.svg",
      "/javascript.svg",
    ],
    macImages:[
      '/drawing1.png',
      '/drawing2.png',
      '/drawing3.png',
    ],
    phoneImages:[
     '/draingphone.png'
    ],
    link:"https://drawing-five-theta.vercel.app/"
  }
]

export function Project() {





 
    const {mode}=useModeContext();
  return (
    <div className={`w-screen   py-16  flex items-start  justify-center ${mode==="dark"?"bg-zinc-900":"bg-zinc-300"}`}>
       
        <div className=' max-w-[1000px] px-3 md:p-0 w-screen  flex-col    justify-start items-center  '>
        <div className="waviy">
      {"Projects".split("").map((char, index) => (
        <span className={`${mode==="dark"?"text-gray-200 select-none":"text-zinc-950"} cursor-pointer `} key={index} style={{ "--i": index + 1 }}>
          {char}
        </span>
      ))}
    </div>
         <div className={`${mode!=="dark"?"text-zinc-900":"text-zinc-200"} h-full w-full  pt-5 gap-6 md:gap-12  items-center flex flex-col`}>
         {projects.map((project, index) => (
           <ProjectCard key={index} project={project} />
         ))}
         </div>
        </div>
    </div>
  )
}

