"use client"

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import loading from "@/public/loading.gif"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { modifyUser } from "@/app/actions";
import { Roles } from "@/controller/back";
import { useCookies } from "next-client-cookies";

export default function UserPage() {
  const searchParams = useSearchParams();
  const user_id = searchParams.get("user");
  const [isLoading, setLoading] = useState(true);
  const router = useRouter(null);

  var cookies;
  const [userRole, setUserRole] = useState(null);

  try { cookies = useCookies(); } catch (error) {
    cookies = null;
  }

  // * Requests data
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState(null);

  // * formData
  const [nom, setNom] = useState('');
  const [id_role, setIdRole] = useState('');

  useEffect(() => {
    if (cookies) {
      setUserRole(cookies.get("userrole"));
    }
    if (userRole == Roles.Manager)
      fetch(`/api/users?user=${user_id}`)
        .then((res) => res.json())
        .then((usersData) => {
          setUser(usersData.body[0]);
          setNom(usersData.body[0].nom);
          setIdRole(usersData.body[0].id_role);
          fetch(`/api/role?role=${usersData.body[0].id_role}`)
            .then((res) => res.json())
            .then((roleData) => {
              setRole(roleData.body[0]);
              fetch(`/api/role`)
                .then((res) => res.json())
                .then((rolesData) => {
                  setRoles(rolesData.body);
                  setLoading(false);
                })
            })
        });
      else
        setLoading(false);
  }, []);

  const formSubmitHandler = async () => {
    let formData = new FormData();

    formData.append('id_utilisateur', user.id_utilisateur);
    formData.append('nom', nom);
    formData.append('id_role', id_role);

    modifyUser(formData);

    router.push("/management/equipe");
  };

  if (isLoading) return (<div><p><Image src={loading} width={20} height={20} alt="Loading" />Chargement des informations de l'utilisateur...</p></div>);
  if (userRole != Roles.Manager) return (<p className="text-red-500">Accès refusé.</p>)
  if (!user) return (<p>Aucun utilisateur trouvée.</p>);

  return (<div>
    <h1>{user.nom}</h1>
    <form>
      <fieldset className="flex flex-row">
        <fieldset className="flex flex-col">
          <fieldset className="flex flex-col mt-2">
            <label>Nom</label>
            <input type="text" name="nom" defaultValue={nom} value={nom} onChange={(event) => setNom(event.target.value)}
              className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border focus:border-orange-500 transition-all rounded" />
          </fieldset>
          <fieldset className="flex flex-col mt-2">
            <label>Rôle</label>
            <select type="select" name="role" defaultValue={id_role} value={id_role} onChange={(event) => { setIdRole(event.target.value); console.log(event.target.value); }}
              className="border border-gray-200 rounded hover:bg-gray-200 transition-all focus:border-orange-500 block w-full py-2 px-1 dark:bg-white dark:focus:ring-orange-500">
              {roles.map(rolet => <option value={rolet.id_role}>{rolet.nom}</option>)}
            </select>
          </fieldset>
          <fieldset className="flex flex-col mt-4">
            <fieldset className="flex flex-row">
              <button type="button" className="px-4 py-1 mr-5 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="submit" onClick={formSubmitHandler}>Valider</button>
              <Link href="/management/equipe"><button type="button" className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="cancel">Annuler</button></Link>
            </fieldset>
          </fieldset>
        </fieldset>
      </fieldset>
    </form>
  </div>);
}