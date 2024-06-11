"use client"

import React, { useRef, useState, useEffect } from 'react';
import ActiviteComponent from '@/components/activite/ActiviteComponent';
import loading from "@/public/loading.gif"
import Image from "next/image";

export default function Home() {
  const itemsRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);

  const [activites, setActivites] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/activite', { headers: { 'accept': 'yolo' } })
      .then((res) => res.json())
      .then((activitesData) => {
        if (activitesData.body !== "No data")
          setActivites(activitesData.body);
        setLoading(false);
      })
  }, []);


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
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - itemsRef.current.offsetLeft;
    const walk = (x - startX) * 1; // ? Adjust the speed
    itemsRef.current.scrollLeft = scrollLeft - walk;
  }

  var activitesDisplay;

  if (isLoading) activitesDisplay = <div><p><Image src={loading} width={20} height={20} alt="Loading" />Chargement des activités...</p></div>;
  if (!activites && !isLoading) activitesDisplay = <p><span className="text-red-600 font-bold">Erreur :</span> Aucune activité trouvée.</p>;
  if (!isLoading && (activites)) activitesDisplay = <div className='flex'>{activites.map((activity, key) => (<div key={key}><div className='w-48 max-w-xs'><ActiviteComponent activite={activity} /></div></div>))}</div>;

  return (
    <div>
      <div className='bg-gray-200 rounded p-2'>
        <div className='flex justify-between'><h1>Mes travaux</h1><p className='text-gray-600'>Du plus au moins récent</p></div>
        <div ref={itemsRef} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className='flex overflow-x-scroll hide-scroll-bar overflow-hidden'>
          {activitesDisplay}
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};
