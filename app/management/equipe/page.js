"use client"

import { getAllUsers } from "@/app/actions";
import { useState, useEffect } from 'react'

export default function Page() {
  const [users, setUsers] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('http://141.94.237.226:8080/api/getUsers/')
      .then((res) => res.json())
      .then((usersData) => {
        setUsers(usersData.body)
        setLoading(false)
      })
  }, []);

  if (isLoading) return (<p>Chargement des utilisateurs...</p>);
  if (!users) return (<p>Aucun utilisateur trouvée.</p>);

  return (
    <div>
      <h1>Utilisateurs</h1>
      <table>
        <thead><th>ID</th><th>Prénom NOM</th><th>ID role</th></thead>
        <tbody>
          {
            users.map(user => <tr key={user.id_utilisateur}>
              <td>{user.id_utilisateur}</td>
              <td>{user.nom}</td>
              <td>{user.id_role}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
}