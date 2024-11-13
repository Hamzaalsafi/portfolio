import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import  {useModeContext}  from './DarkModeProvider';
import Tooltip from '@mui/material/Tooltip';
import {Gallery} from './Gallery'
export function Project() {
 const [activeTooltip, setActiveTooltip] = useState(null); // Track active tooltip

  const handleTooltipClick = (tooltipName) => {
    if (activeTooltip === tooltipName) {
      setActiveTooltip(null); // Close the tooltip if it’s already open
    } else {
      setActiveTooltip(tooltipName); // Open the tooltip
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
         <div className={`${mode!=="dark"?"text-zinc-900":"text-zinc-200"} h-full w-full pt-5   items-center flex flex-col`}>
            <div className='flex justify-between h-fit rounded-xl p-4 pb-3 donation w-full '>
               <div className='w-1/2 justify-start'>
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

               <div className='w-1/2'>
              <Gallery/>
 
               </div>
            </div>
         </div>
        </div>
    </div>
  )
}

