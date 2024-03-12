"use client"

export default function CalendrierExec() {
  const calendarUpdate = () => {
    console.log("yo");
  };

  return (
    <div>
      <button type="button" className="px-4 py-1 mr-5 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="submit" onClick={calendarUpdate}>Valider</button>
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