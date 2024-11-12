import React, { useState, useEffect, useRef } from 'react';
import  {useModeContext}  from './DarkModeProvider';

export function Project() {
    const {mode}=useModeContext();
  return (
    <div className={`w-screen h-screen flex items-start  justify-center ${mode==="dark"?"bg-zinc-900":"bg-zinc-300"}`}>
       
        <div className=' max-w-[1000px] w-screen h-screen flex-col  max-h-[90%]  justify-start items-center  '>
        <div className="waviy">
      {"Projects".split("").map((char, index) => (
        <span className={`${mode==="dark"?"text-gray-200":"text-zinc-950"} cursor-pointer `} key={index} style={{ "--i": index + 1 }}>
          {char}
        </span>
      ))}
    </div>
         <div className="text-gray-200 h-full w-full pt-5  items-center flex flex-col">
            <div className='flex justify-between w-full'>
                <h1 className='text-4xl font-bold'>Project Title</h1>
                <h2 className='text-xl font-bold'>Project Description</h2>
            </div>
         </div>
        </div>
    </div>
  )
}

