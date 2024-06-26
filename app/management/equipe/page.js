"use client"

import { useState, useEffect } from 'react'
import Image from "next/image";
import loading from "@/public/loading.gif"
import { TeButton } from "@/components/TeButton";
import Link from "next/link";
import { getCookie, setCookie } from 'cookies-next';
import { Roles } from '@/controller/back';

export default function Page() {
  const [users, setUsers] = useState(null);
  const [roles, setRoles] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setUserRole(getCookie("userrole"));

    fetch('/api/users')
      .then((res) => res.json())
      .then((usersData) => {
        setUsers(usersData.body)
        fetch(`/api/role`)
          .then((res) => res.json())
          .then((roleData) => {
            setRoles(roleData.body);
            setLoading(false);
          });
      });
  }, []);

  if (isLoading) return (<div><p><Image src={loading} width={20} height={20} alt="Loading" />Chargement des utilisateurs...</p></div>);
  if (userRole != Roles.Manager) return (<p className="text-red-500">Accès refusé.</p>)
  if (!users) return (<p>Aucun utilisateur trouvée.</p>);

  return (
    <div>
      <h1>Utilisateurs</h1>
      <table>
        <thead><th>ID</th><th>Prénom NOM</th><th>ID role</th></thead>
        <tbody>
          {users.map(user => <tr key={user.id_utilisateur} className='border-t-2 border-gray-400 text-center'>
            <td>{user.id_utilisateur}</td>
            <td>{user.nom}</td>
            <td>{roles[user.id_role - 1].nom}</td>
            <td><Link href={{
              pathname: "/management/equipe/utilisateur",
              query: { user: user.id_utilisateur },
            }}><TeButton type="submit" texte="Modifier" /></Link></td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}