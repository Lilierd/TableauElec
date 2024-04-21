"use client"

import React, { useRef, useState } from 'react';
import ActiviteComponent from '@/components/activite/ActiviteComponent';

export default function Home() {
  const activities = [["batteries", "Bastien", "Rémi"], ["isolement", "Rémi", "Maxime"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"]];
  
  const itemsRef = useRef(null);
  const [ isMouseDown, setIsMouseDown ] = useState(false);
  const [ startX, setStartX ] = useState(0);
  const [ scrollLeft, setScrollLeft] = useState(false);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - - itemsRef.current.offsetLeft);
    setScrollLeft(itemsRef.current.scrollLeft);
  }
  const handleMouseLeave = () => {
    setIsMouseDown(false);
  }
  const handleMouseUp = () => {
    setIsMouseDown(false);
  }
  const handleMouseMove = (e) => {
    if(!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - itemsRef.current.offsetLeft;
    const walk = (x-startX)*1; // ? Adjust the speed
      itemsRef.current.scrollLeft = scrollLeft - walk;
  }

  return (
    <div>
      <div className='bg-gray-200 rounded p-2'>
        <div className='flex justify-between'><h1>Mes travaux</h1><p className='text-gray-600'>Du plus au moins récent</p></div>
        <div ref={itemsRef} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className='flex overflow-x-scroll hide-scroll-bar overflow-hidden'>
          <div className='flex'>
            {activities.map((activity, key) => (
              <div key={key}><div className='w-48 max-w-xs'><ActiviteComponent activite={activity} /></div></div>
            ))}
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};
