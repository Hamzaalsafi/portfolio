import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import  {useModeContext}  from './DarkModeProvider';
import Tooltip from '@mui/material/Tooltip';
import {Gallery} from './Gallery'


export function Project() {
  let kittyTaskPhone=[
    "/kittyTaskPhone2.png",
    "/kittyTaskPhone1.png",
    "/kittyTaskPhone3.png"
  ]
  let kittyTaskMac=[
    "/kittyTask1.png",
    "/kittyTask2.png",
    "/kittyTask3.png",
    "/kittyTask4.png",
    "/kittyTask5.png"
  ]
 const [activeTooltip, setActiveTooltip] = useState(null); 
 const [showOptions,setShowOptions] = useState('laptop');
  const handleTooltipClick = (tooltipName) => {
    if (activeTooltip === tooltipName) {
      setActiveTooltip(null);
    } else {
      setActiveTooltip(tooltipName); 
    }
  };

    const {mode}=useModeContext();
  return (
    <div className={`w-screen   py-16  flex items-start  justify-center ${mode==="dark"?"bg-zinc-900":"bg-zinc-300"}`}>
       
        <div className=' max-w-[1000px] w-screen  flex-col    justify-start items-center  '>
        <div className="waviy">
      {"Projects".split("").map((char, index) => (
        <span className={`${mode==="dark"?"text-gray-200":"text-zinc-950"} cursor-pointer `} key={index} style={{ "--i": index + 1 }}>
          {char}
        </span>
      ))}
    </div>
         <div className={`${mode!=="dark"?"text-zinc-900":"text-zinc-200"} h-full w-full pt-5 gap-5 md:gap-8  items-center flex flex-col`}>
            <div className='flex md:flex-row flex-col phone  justify-between h-fit  rounded-xl p-4 pb-3 donation w-full '>
               <div className='md:w-1/2  justify-start'>
                 <h1 className='text-2xl font-bold'>KittyTask</h1>
                 <h2 className='text-lg pt-1 font-bold'>Streamlined Task Management, Inspired by Trello</h2>
                 <p className={`text-[1.17rem] ${mode!=="dark"?"text-zinc-800":"text-zinc-300"}`}>  KittyTask brings task management to a new level with real-time collaboration, fully customizable boards, and smooth, intuitive animations. Experience powerful drag-and-drop functionality in a user-friendly interface.</p>
                 <h2 className='text-lg py-1 font-bold'>Key Features:</h2>
                 <ul className={`list-disc text-[1.1rem] pl-5 ${mode!=="dark"?"text-zinc-800":"text-zinc-300"}`}>
                   <li>Real-time collaboration</li>
                   <li>Smooth, interactive animations</li>
                   <li>Drag-and-drop functionality</li>
                   <li>Fully customizable boards</li>
                   <li>Intuitive, user-friendly interface</li>
                   <li>Fast and responsive design</li>
                 </ul>
                 <div className='flex gap-2.5  pt-2 items-center flex-wrap'>
                    <Tooltip
                      PopperProps={{
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -4]
                            },
                          },
                        ],
                      }}
                      title="React"
                      arrow
                      open={activeTooltip === 'react'}
                      onClose={() => setActiveTooltip(null)}
                      onOpen={() => setActiveTooltip('react')}
                      classes={{
                        tooltip: mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                        arrow:mode === "dark" ? "custom-arrow":"custom-arrow2",
                      }}
                    >
                      <motion.div
                       whileHover={{
                        rotate: 180,  
                        scale: 1.15,    
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,  
                        },
                      }}
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}  
                      exit={{ opacity: 0 }}    
                      
                        onClick={() => handleTooltipClick('react')}
                        className="w-10 h-10 cursor-pointer donation rounded-full flex items-center justify-center"
                      >
                        <img className="h-8 w-8" src="/react.svg" alt="React Logo" />
                      </motion.div>
                    </Tooltip>

                    <Tooltip
                     PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -4]
                          },
                        },
                      ],
                    }}
                    classes={{
                      tooltip: mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                      arrow:mode === "dark" ? "custom-arrow":"custom-arrow2",
                    }}
                      title="Tailwind"
                      arrow
                      open={activeTooltip === 'tailwind'}
                      onClose={() => setActiveTooltip(null)}
                      onOpen={() => setActiveTooltip('tailwind')}
                    >
                        <motion.div
                       whileHover={{
                        rotate: 180,  
                        scale: 1.15,    
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,  
                        },
                      }}
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}  
                      exit={{ opacity: 0 }}    
                        onClick={() => handleTooltipClick('tailwind')}
                        className="w-10 h-10 cursor-pointer donation rounded-full flex items-center justify-center"
                      >
                        <img className="h-9 w-9" src="/tailwind.png" alt="Tailwind Logo" />
                      </motion.div>
                    </Tooltip>

                    <Tooltip
                     PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -4]
                          },
                        },
                      ],
                    }}
                    classes={{
                      tooltip: mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                      arrow:mode === "dark" ? "custom-arrow":"custom-arrow2",
                    }}
                      title="CSS"
                      arrow
                      open={activeTooltip === 'css'}
                      onClose={() => setActiveTooltip(null)}
                      onOpen={() => setActiveTooltip('css')}
                    >
                      <motion.div
                      whileHover={{
                        rotate: 180,  
                        scale: 1.15,    
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,  
                        },
                      }}
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}  
                      exit={{ opacity: 0 }}   
                        onClick={() => handleTooltipClick('css')}
                        className="w-10 h-10 cursor-pointer donation rounded-full flex items-center justify-center"
                      >
                        <img className="h-7 w-7" src="/css.svg" alt="CSS Logo" />
                      </motion.div>
                    </Tooltip>

                    <Tooltip
                     PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -4]
                          },
                        },
                      ],
                    }}
                    classes={{
                      tooltip: mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                      arrow:mode === "dark" ? "custom-arrow":"custom-arrow2",
                    }}
                      title="Firebase"
                      arrow
                      open={activeTooltip === 'firebase'}
                      onClose={() => setActiveTooltip(null)}
                      onOpen={() => setActiveTooltip('firebase')}
                    >
                      <motion.div
                      whileHover={{
                        rotate: 180,  
                        scale: 1.15,    
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,  
                        },
                      }}
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}  
                      exit={{ opacity: 0 }}   
                        onClick={() => handleTooltipClick('firebase')}
                        className="w-10 h-10 cursor-pointer donation rounded-full flex items-center justify-center"
                      >
                        <img className="h-8 w-8" src="/firebase.svg" alt="Firebase Logo" />
                      </motion.div>
                    </Tooltip>

                    <Tooltip
                     PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -4]
                          },
                        },
                      ],
                    }}
                    classes={{
                      tooltip: mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                      arrow:mode === "dark" ? "custom-arrow":"custom-arrow2",
                    }}
                      title="Vite"
                      arrow
                      open={activeTooltip === 'vite'}
                      onClose={() => setActiveTooltip(null)}
                      onOpen={() => setActiveTooltip('vite')}
                    >
                      <motion.div
                      whileHover={{
                        rotate: 180,  
                        scale: 1.15,    
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,  
                        },
                      }}
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}  
                      exit={{ opacity: 0 }}   
                        onClick={() => handleTooltipClick('vite')}
                        className="w-10 h-10 cursor-pointer donation rounded-full flex items-center justify-center"
                      >
                        <img className="h-7 w-7" src="/vite.png" alt="Vite Logo" />
                      </motion.div>
                    </Tooltip>
                 </div>
               </div>

               <div className='md:w-1/2 md:mb-0 mb-5  relative'>
               <div className='md:absolute relative z-50  text-slate-950 text-3xl gap-5 text-center mb-2 w-full flex justify-center items-center' >
               <motion.img
  onClick={() => setShowOptions("iphone")}
  src="/iphone.svg"
  alt="Iphone"
  className={`w-8 h-8 md:h-10 md:w-10 px-1 cursor-pointer rounded-xl ${mode === "dark" && showOptions === "iphone" ? "bg-gray-300" : "bg-gray-300"}`}
  animate={{
    scale: showOptions === "iphone" ? 1.15 : 1, // Enlarges when selected
    boxShadow: showOptions === "iphone" ? "0px 4px 15px rgba(0, 0, 0, 0.2)" : "none",
    backgroundColor: showOptions === "iphone" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0)", // Transparent black
  }}
  transition={{
    duration: 0.2,
    ease: "easeOut",
  }}
/>

<motion.img
  onClick={() => setShowOptions("laptop")}
  src="/laptop2.svg"
  alt="Laptop"
  className={`w-8 h-8 md:h-10 md:w-10 p-1 cursor-pointer rounded-xl ${mode === "dark" && showOptions === "laptop" ? "bg-gray-300" : "bg-gray-300"}`}
  animate={{
    scale: showOptions === "laptop" ? 1.15 : 1,
    boxShadow: showOptions === "laptop" ? "0px 4px 15px rgba(0, 0, 0, 0.2)" : "none",
    backgroundColor: showOptions === "laptop" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0)", // Transparent black
  }}
  transition={{
    duration: 0.2,
    ease: "easeOut",
  }}
/>

               </div>
               {showOptions === "laptop" && (
   
      <Gallery  images={kittyTaskMac} />
    
  )}
  
  {showOptions === "iphone" && (
   
      <Gallery images={kittyTaskPhone}  />
   
  )}
               </div>
            </div>
            <div className='flex md:flex-row flex-col phone  justify-between h-fit  rounded-xl p-4 pb-3 donation w-full '>
               <div className='md:w-1/2  justify-start'>
                 <h1 className='text-2xl font-bold'>Interactive Drawing Tool</h1>
                 <h2 className='text-lg pt-1 font-bold'>Intuitive Digital Art Creation, Built for All Devices</h2>
                 <p className={`text-[1.17rem] ${mode!=="dark"?"text-zinc-800":"text-zinc-300"}`}>  Interactive Drawing Tool takes the drawing experience to a new level with a feature-rich interface designed for artists and creatives. Enjoy smooth animations, realistic tools, and full customization options, all crafted to deliver a seamless experience.</p>
                 <h2 className='text-lg py-1 font-bold'>Key Features:</h2>
                 <ul className={`list-disc text-[1.1rem] pl-5 ${mode!=="dark"?"text-zinc-800":"text-zinc-300"}`}>
                   <li>Realistic Tools</li>
                   <li>Shape Drawer</li>
                   <li>Dynamic Text:Add, move, with drag-and-drop </li>
                   <li>Undo/Redo</li>
                   <li>Save & Delete</li>
                   <li>Smooth Animations & User-Friendly Interface</li>
                 </ul>
                 <div className='flex gap-2.5  pt-2 items-center flex-wrap'>
                    <Tooltip
                      PopperProps={{
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -4]
                            },
                          },
                        ],
                      }}
                      title="React"
                      arrow
                      open={activeTooltip === 'react'}
                      onClose={() => setActiveTooltip(null)}
                      onOpen={() => setActiveTooltip('react')}
                      classes={{
                        tooltip: mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                        arrow:mode === "dark" ? "custom-arrow":"custom-arrow2",
                      }}
                    >
                      <motion.div
                       whileHover={{
                        rotate: 180,  
                        scale: 1.15,    
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,  
                        },
                      }}
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}  
                      exit={{ opacity: 0 }}    
                      
                        onClick={() => handleTooltipClick('react')}
                        className="w-10 h-10 cursor-pointer donation rounded-full flex items-center justify-center"
                      >
                        <img className="h-8 w-8" src="/react.svg" alt="React Logo" />
                      </motion.div>
                    </Tooltip>

                    <Tooltip
                     PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -4]
                          },
                        },
                      ],
                    }}
                    classes={{
                      tooltip: mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                      arrow:mode === "dark" ? "custom-arrow":"custom-arrow2",
                    }}
                      title="Tailwind"
                      arrow
                      open={activeTooltip === 'tailwind'}
                      onClose={() => setActiveTooltip(null)}
                      onOpen={() => setActiveTooltip('tailwind')}
                    >
                        <motion.div
                       whileHover={{
                        rotate: 180,  
                        scale: 1.15,    
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,  
                        },
                      }}
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}  
                      exit={{ opacity: 0 }}    
                        onClick={() => handleTooltipClick('tailwind')}
                        className="w-10 h-10 cursor-pointer donation rounded-full flex items-center justify-center"
                      >
                        <img className="h-9 w-9" src="/tailwind.png" alt="Tailwind Logo" />
                      </motion.div>
                    </Tooltip>

                    <Tooltip
                     PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -4]
                          },
                        },
                      ],
                    }}
                    classes={{
                      tooltip: mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                      arrow:mode === "dark" ? "custom-arrow":"custom-arrow2",
                    }}
                      title="CSS"
                      arrow
                      open={activeTooltip === 'css'}
                      onClose={() => setActiveTooltip(null)}
                      onOpen={() => setActiveTooltip('css')}
                    >
                      <motion.div
                      whileHover={{
                        rotate: 180,  
                        scale: 1.15,    
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,  
                        },
                      }}
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}  
                      exit={{ opacity: 0 }}   
                        onClick={() => handleTooltipClick('css')}
                        className="w-10 h-10 cursor-pointer donation rounded-full flex items-center justify-center"
                      >
                        <img className="h-7 w-7" src="/css.svg" alt="CSS Logo" />
                      </motion.div>
                    </Tooltip>

                    <Tooltip
                     PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -4]
                          },
                        },
                      ],
                    }}
                    classes={{
                      tooltip: mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                      arrow:mode === "dark" ? "custom-arrow":"custom-arrow2",
                    }}
                      title="Firebase"
                      arrow
                      open={activeTooltip === 'firebase'}
                      onClose={() => setActiveTooltip(null)}
                      onOpen={() => setActiveTooltip('firebase')}
                    >
                      <motion.div
                      whileHover={{
                        rotate: 180,  
                        scale: 1.15,    
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,  
                        },
                      }}
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}  
                      exit={{ opacity: 0 }}   
                        onClick={() => handleTooltipClick('firebase')}
                        className="w-10 h-10 cursor-pointer donation rounded-full flex items-center justify-center"
                      >
                        <img className="h-8 w-8" src="/firebase.svg" alt="Firebase Logo" />
                      </motion.div>
                    </Tooltip>

                    <Tooltip
                     PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -4]
                          },
                        },
                      ],
                    }}
                    classes={{
                      tooltip: mode === "dark" ? "custom-tooltip" : "custom-tooltip2",
                      arrow:mode === "dark" ? "custom-arrow":"custom-arrow2",
                    }}
                      title="Vite"
                      arrow
                      open={activeTooltip === 'vite'}
                      onClose={() => setActiveTooltip(null)}
                      onOpen={() => setActiveTooltip('vite')}
                    >
                      <motion.div
                      whileHover={{
                        rotate: 180,  
                        scale: 1.15,    
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,  
                        },
                      }}
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}  
                      exit={{ opacity: 0 }}   
                        onClick={() => handleTooltipClick('vite')}
                        className="w-10 h-10 cursor-pointer donation rounded-full flex items-center justify-center"
                      >
                        <img className="h-7 w-7" src="/vite.png" alt="Vite Logo" />
                      </motion.div>
                    </Tooltip>
                 </div>
               </div>

               <div className='md:w-1/2 md:mb-0 mb-5  relative'>
               <div className='md:absolute relative z-50  text-slate-950 text-3xl gap-5 text-center mb-2 w-full flex justify-center items-center' >
               <motion.img
  onClick={() => setShowOptions("iphone")}
  src="/iphone.svg"
  alt="Iphone"
  className={`w-8 h-8 md:h-10 md:w-10 px-1 cursor-pointer rounded-xl ${mode === "dark" && showOptions === "iphone" ? "bg-gray-300" : "bg-gray-300"}`}
  animate={{
    scale: showOptions === "iphone" ? 1.15 : 1, // Enlarges when selected
    boxShadow: showOptions === "iphone" ? "0px 4px 15px rgba(0, 0, 0, 0.2)" : "none",
    backgroundColor: showOptions === "iphone" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0)", 
  }}
  transition={{
    duration: 0.2,
    ease: "easeOut",
  }}
/>

<motion.img
  onClick={() => setShowOptions("laptop")}
  src="/laptop2.svg"
  alt="Laptop"
  className={`w-8 h-8 md:h-10 md:w-10 p-1 cursor-pointer rounded-xl ${mode === "dark" && showOptions === "laptop" ? "bg-gray-300" : "bg-gray-300"}`}
  animate={{
    scale: showOptions === "laptop" ? 1.15 : 1,
    boxShadow: showOptions === "laptop" ? "0px 4px 15px rgba(0, 0, 0, 0.2)" : "none",
    backgroundColor: showOptions === "laptop" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0)", // Transparent black
  }}
  transition={{
    duration: 0.2,
    ease: "easeOut",
  }}
/>

               </div>
               {showOptions === "laptop" && (
   
      <Gallery  images={kittyTaskMac} />
    
  )}
  
  {showOptions === "iphone" && (
   
      <Gallery images={kittyTaskPhone}  />
   
  )}
               </div>
            </div>
         </div>
        </div>
    </div>
  )
}

