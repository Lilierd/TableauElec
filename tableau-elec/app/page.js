import React from 'react';
import ActiviteComponent from '@/components/activite/ActiviteComponent';

export default function Home() {
  const activities = [["batteries", "Bastien", "Rémi"], ["isolement", "Rémi", "Maxime"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"], ["course", "Maxime", "Bastien"]];

  return (
    <div>
      <div className='bg-gray-200 rounded p-2'>
        <div className='flex justify-between'><h1>Mes travaux</h1><p className='text-gray-600'>Du plus au moins récent</p></div>
        <div className='flex overflow-x-scroll hide-scroll-bar overflow-hidden'>
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
}