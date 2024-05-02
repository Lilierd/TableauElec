"use client"

import { useState, useEffect } from 'react'
import loading from "@/public/loading.gif"
import Image from "next/image";

export default function Page() {
  const [activites, setActivites] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('http://141.94.237.226:8080/api/activite/')
      .then((res) => res.json())
      .then((activitesData) => {
        setActivites(activitesData.body)
        setLoading(false)
      })
  }, []);
 
  if (isLoading) return (<div><p><Image src={loading} width={20} height={20} alt="Loading" />Chargement des activités...</p></div>);
  if (!activites) return (<p>Aucune activité trouvée.</p>);

  return (
    <div>
      <h1>Activités</h1>
      <table>
        <thead><th scope="col">ID</th><th>Nom</th><th>Desc</th><th>Date</th><th>ID CT</th></thead>
        <tbody>
          {
            activites.map(activite => <tr key={activite.id_activite}>
              <th scope="row">{activite.id_activite}</th>
              <td>{activite.nom}</td>
              <td>{activite.descript}</td>
              <td>{activite.date_activite}</td>
              <td>{activite.id_ct}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
}