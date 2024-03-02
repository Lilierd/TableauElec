import React from 'react';
import { Header } from '@/components/header';
import Activite from '@/components/activite/Activite';

export default function Home() {
  const activities = ["batteries", "isolement", "course"];

  return (
    <div>
      <div>
        patate
        <ul className='flex'>
          {activities.map((activity) => (
            <li><Activite name={activity} /></li>
          ))}
        </ul>
      </div>
    </div>
  );
}