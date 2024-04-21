"use client"

import { TeButton } from "../TeButton";

export default function CalendrierExec() {
  const calendarUpdate = () => {
    console.log("yo");
  };

  return (
    <div>
      <TeButton texte="Valider" onClick={calendarUpdate}/>
      <table>
        <caption>Patate</caption>
        <thead>
          <tr>
            <th>{/* Cellule vide pour le décalage de la colonne des noms */}</th>
            <th>Lundi</th>
            <th>Mardi</th>
            <th>Mercredi</th>
            <th>Jeudi</th>
            <th>Vendredi</th>
            <th>Samedi</th>
            <th>Dimanche</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>test</th>
            <td>patate</td>
            <td>patate</td>
            <td>patate</td>
            <td>patate</td>
            <td>patate</td>
            <td>patate</td>
            <td>patate</td>
          </tr>
          <tr>
            <th>test2</th>
            <td>carotte</td>
            <td>carotte</td>
            <td>carotte</td>
            <td>carotte</td>
            <td>carotte</td>
            <td>carotte</td>
            <td>carotte</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}