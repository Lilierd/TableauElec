"use client"

import { TeButton } from "@/components/TeButton";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import loading from "@/public/loading.gif"
import Image from "next/image";
import { useCookies } from "next-client-cookies";
import { getCookie, setCookie } from 'cookies-next';

import { createActivity, deleteActivity, modifyActivity, postComment } from "@/app/actions";  // * <------- Données de création/modif envoyées ici
import { Roles } from "@/controller/back";


export default function ActivitePage() {
  const searchParams = useSearchParams();
  const activite_id = searchParams.get("activite");
  const router = useRouter();
  // * const cookies = useCookies();

  const [activite, setActivite] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [cdtUser, setCdtUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [forumMessages, setForumMessages] = useState([]);

  // * En cours de modif ou non
  const [modifying, setModify] = useState(false);
  const setModifying = () => { setModify(true) };
  const setNotModifying = () => { setModify(false) };

  // * formData activite
  const [titre, setTitre] = useState('');
  const [cdt, setCdt] = useState(null);
  const [execs, setExecs] = useState(null);
  const [rep, setRep] = useState('');
  const [desc, setDesc] = useState('');
  const [files, setFiles] = useState('');

  //* formData comment
  const [cTitre, setCTitre] = useState("");
  const [cMessage, setCMessage] = useState("");

  const [userRole, setUserRole] = useState(null);
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    setUserRole(getCookie("userrole"));
    setUserid(getCookie("userid"));

    if (activite_id !== null && activite_id !== "undefined") {
      fetch(`/api/activite?activite=${activite_id}`)
        .then((res) => res.json())
        .then((activitesData) => {
          setActivite(activitesData.body);
          fetch(`/api/users?user=${activitesData.body[0].id_ct}`)
            .then((res) => res.json())
            .then((userData) => {
              setCdtUser(userData.body[0]);
              setCdt(userData.body[0].id_utilisateur)
              setTitre(activitesData.body[0].nom)
              setExecs(activitesData.body[0].id_exec)
              setRep(activitesData.body[0].rep_fonc)
              setDesc(activitesData.body[0].descript)
              // setFiles();
              fetch(`/api/users`)
                .then((res) => res.json())
                .then((usersData) => {
                  setAllUsers(usersData.body);
                  fetch(`/api/forum?activite=${activite_id}`)
                    .then((res) => res.json())
                    .then((forumData) => {
                      if (forumData.body !== "No data")
                        setForumMessages(forumData.body);
                      setLoading(false);
                    });
                })
            })
        })
    }
    else {
      fetch(`/api/users`)
        .then((res) => res.json())
        .then((usersData) => {
          setAllUsers(usersData.body);
          setLoading(false);
        });
    }
  }, []);

  // * Submit du formulaire
  const formSubmitHandler = async (e) => {
    setNotModifying();

    let formData = new FormData();

    if (cdt == 0 || execs == 0)
      return;

    if (titre === null || cdt === null || rep === null || execs === null)
      return;

    formData.append('id_activite', activite_id);
    formData.append('titre', titre);
    formData.append('cdt', cdt);
    formData.append('rep', rep);
    formData.append('execs', execs);  
    formData.append('desc', desc);
    // formData.append('files',files);

    if (activite_id === null || activite_id === "undefined") {
      createActivity(formData).then((id) => {
        location.assign(`/activite?activite=${id}`);
      });
    }
    else {
      await modifyActivity(formData);
      location.reload();
    }
  }

  const removeActivity = async (e) => {
    await deleteActivity(activite_id);
    router.push("/");
  }

  const commentSubmitHandler = async (e) => {
    if (cTitre.length < 1 || cMessage.length < 1 || activite_id === null)
      return;

    let formData = new FormData();

    formData.append('titre', cTitre);
    formData.append('message', cMessage);
    formData.append('id_activite', activite_id);
    formData.append('id_utilisateur', userid);

    postComment(formData);

    location.reload();
  }

  if (activite == null && (userRole != Roles.Manager && userRole != Roles.CA) && !isLoading) return <p className="text-red-500">Accès refusé</p>
  if (isLoading) return (<div><p><Image src={loading} width={20} height={20} alt="Loading" />Chargement de l'activité...</p></div>);

  return (
    <div>
      <div className="mb-4 p-2 flex justify-between">
        <div>{(!modifying && !(activite === null || activite_id === "undefined") && (userRole == Roles.Manager || userRole == Roles.CA)) && <TeButton onClick={setModifying} texte={"Modifier"}>Modifier</TeButton>}</div>
        <div>{(!(activite === null || activite_id === "undefined") && (userRole == Roles.Manager || userRole == Roles.CA)) && <TeButton alert={true} onClick={removeActivity} className="bg-red-500" texte={"Supprimer"}>Supprimer</TeButton>}</div>
        <button className="group p-1 transition-all border-gray-400 duration-200 rounded inline-block border hover:bg-gray-200" onClick={() => router.back()}>
          <span className="group-hover:-translate-x-1 duration-200 inline-block">&lt;-</span> Retour</button>
      </div>
      {activite !== null ? <h1 className="mb-6">{modifying ? "Modification de " + activite[0].nom : activite[0].nom}</h1> : <h1 className="mb-6">Création d'une activité</h1>}

      {(modifying || (activite === null || activite_id === "undefined")) ?
        <form>
          <fieldset className="flex flex-row">
            <fieldset className="flex flex-col">
              <fieldset className="mt-2 flex flex-col">
                <label>Titre de l&apos;activité</label>
                <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded" type="text" value={titre} defaultValue={titre}
                  onChange={(event) => setTitre(event.target.value)} name="activite[titre]" required />
              </fieldset>
              <fieldset className="mt-2 flex flex-col">
                <label>Chargé de travaux</label>
                <select type="select" value={cdt} defaultValue={0} onChange={(event) => setCdt(event.target.value)} name="activite[CdT]"
                  className="border border-gray-200 rounded hover:bg-gray-200 transition-all focus:border-orange-500 block w-full py-2 px-1 dark:bg-white dark:focus:ring-orange-500">
                  <option key={0} value={0}>Sélectionner un chargé de travaux...</option>
                  {allUsers.filter((u) => { return u.id_role == Roles.CSI }).map(ut => <option key={ut.id_utilisateur} value={ut.id_utilisateur}>{ut.nom}</option>)}
                </select>
              </fieldset>
              <fieldset className="mt-2 flex flex-col">
                <label>Exécutant</label>
                <select type="select" value={execs} defaultValue={0} onChange={(event) => setExecs(event.target.value)} name="activite[Execs]"
                  className="border border-gray-200 rounded hover:bg-gray-200 transition-all focus:border-orange-500 block w-full py-2 px-1 dark:bg-white dark:focus:ring-orange-500">
                  <option key={0} value={0}>Sélectionner un exécutant...</option>
                  {allUsers.filter((u) => { return u.id_role == Roles.Intervenant || u.id_role == Roles.CSI }).map(ut => <option key={ut.id_utilisateur} value={ut.id_utilisateur}>{ut.nom}</option>)}
                </select>
                {/* TODO: Mettre une possibilité de mettre plusieurs execs/Faire apparaitre une liste */}
              </fieldset>
              <fieldset className="mt-2 flex flex-col">
                <label>Repère fonctionnel</label>
                <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded" type="text" value={rep} defaultValue={rep}
                  onChange={(event) => setRep(event.target.value)} name="activite[Rep]" maxLength={15} required />
              </fieldset>
              <fieldset className="mt-2 flex flex-col">
                <label>Description de l&apos;activité</label>
                <textarea className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded resize-y" cols="50" defaultValue={desc}
                  onChange={(event) => setDesc(event.target.value)} name="activite[desc]" maxLength="1000" />
              </fieldset>
              <fieldset className="mt-2 flex flex-col">
                <label>Fichiers joints</label>
                <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded" type="file" value={files} defaultValue={files}
                  onChange={(event) => setFiles(event.target.value)} name="activite[fichiers]" multiple />
              </fieldset>
              <fieldset className="flex flex-row mt-4">
                <button type="button" className="px-4 py-1 mr-5 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="submit" onClick={formSubmitHandler}>Valider</button>
                <button type="button" className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="cancel" onClick={setNotModifying}>Annuler</button>
              </fieldset>
            </fieldset>
          </fieldset>
        </form>
        : // * Si pas modification mais données existantes
        <div>
          <div>
            <div id="CT">
              <h2>Chargé de travaux</h2>
              <p>{cdtUser.nom}</p>
            </div>
            <div id="Execs">
              <h2>Exécutant</h2>
              <p>{allUsers.filter((u) => { return u.id_utilisateur == activite[0].id_exec; })[0].nom}</p>
            </div>
            <div id="Rep">
              <h2>Repère fonctionnel</h2>
              <p>{activite[0].rep_fonc}</p>
            </div>
            <div id="Desc">
              <h2>Description</h2>
              <p>{activite[0].descript}</p>
            </div>
            <div id="Date">
              <h2>Date</h2>
              <p>{activite[0].date_activite.split('T')[0] + " " + activite[0].date_activite.split('T')[1].split('.')[0]}</p>
            </div>
          </div>
          <div id="forum" className="mt-5 pt-5 border-t-2 border-gray-400">
            <h1>Commentaires</h1>
            <div className="">
              <form className="mt-2 p-2 border rounded border-gray-300 bg-gray-200">
                <h2>Nouveau commentaire</h2>
                <fieldset className="flex flex-col">
                  <fieldset className="mt-2 flex flex-col w-1/2">
                    <label>Titre du commentaire</label>
                    <input className="px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 border transition-all rounded" type="text" value={cTitre} defaultValue={cTitre}
                      onChange={(event) => setCTitre(event.target.value)} name="comment[titre]" maxLength="100" required />
                  </fieldset>
                  <fieldset className="mt-2 flex flex-col w-1/2">
                    <label>Message</label>
                    <textarea className="px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 border transition-all rounded" type="text" value={cMessage} defaultValue={cMessage}
                      onChange={(event) => setCMessage(event.target.value)} name="comment[titre]" placeholder="Votre message..." maxLength="1000" required />
                  </fieldset>
                  <fieldset className="mt-2 flex flex-row">
                    <button type="button" className="px-4 py-1 mr-5 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="submit" onClick={commentSubmitHandler}>Envoyer</button>
                  </fieldset>
                </fieldset>
              </form>
            </div>
            <div className="mt-5">
              {
                forumMessages.length ? forumMessages.map(message => <div key={message.id_forum} className="mb-5 border rounded border-gray-300 bg-gray-200 p-4">
                  <div className="flex justify-between"><h2>{message.titre}</h2><p className="text-sm">{allUsers.filter((u) => { return u.id_utilisateur == message.id_author; })[0].nom}</p></div>
                  <p className="bg-white p-2 mt-1 mb-1 rounded">{message.texte}</p>
                  <p className="text-xs pt-1">{message.date_message.split('T')[0] + " " + message.date_message.split('T')[1].split('.')[0]}</p>
                </div>)
                  :
                  <div>Aucun message.</div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  );
}