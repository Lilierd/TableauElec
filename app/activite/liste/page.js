"use server"

import { getAllActivites } from "@/app/actions";

export default async function Page() {
  const activites = await getAllActivites();

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