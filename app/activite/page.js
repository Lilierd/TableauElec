"use client"

import { TeButton } from "@/components/TeButton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, act } from "react";
import loading from "@/public/loading.gif"
import Image from "next/image";

import { createActivity, modifyActivity } from "@/app/actions";  // * <------- Données de création/modif envoyées ici

export default function ActivitePage() {
  const searchParams = useSearchParams();
  const activite_id = searchParams.get("activite"); // TODO: Remplacer le titre par un id

  const [activite, setActivite] = useState(null)
  const [cdtUser, setCdtUser] = useState(null)
  const [isLoading, setLoading] = useState(true)

  var legende = ""; // * Si création ou modif
  if (activite_id === null)
    legende = "Création d'une activité";

  if (activite_id !== null) {
    useEffect(() => {
      fetch(`http://141.94.237.226:8080/api/activite?activite=${activite_id}`)
        .then((res) => res.json())
        .then((activitesData) => {
          setActivite(activitesData.body);
          fetch(`http://141.94.237.226:8080/api/getUsers?user=${activitesData.body[0].id_ct}`)
            .then((res) => res.json())
            .then((userData) => {
              setCdtUser(userData.body);
              setLoading(false);
            })
        })
    }, []);
  }

  // * En cours de modif ou non
  const [modifying, setModify] = useState(false);
  const setModifying = () => { setModify(true) };
  const setNotModifying = () => { setModify(false) };

  // * formData
  const [titre, setTitre] = useState('');
  const [cdt, setCdt] = useState('');
  const [execs, setExecs] = useState('');
  const [desc, setDesc] = useState('');
  const [files, setFiles] = useState('');

  // * Submit du formulaire
  const formSubmitHandler = async () => {
    setNotModifying();

    let formData = new FormData();

    formData.append('titre', titre)
    formData.append('cdt', cdt)
    formData.append('execs', execs)
    formData.append('desc', desc)
    // formData.append('files',files);

    if (activite_id === null) {
      createActivity(formData);

      //TODO: rediriger sur cette page mais avec activite_id=activite_id en GET
    }
    else {
      await modifyActivity(formData);
      //TODO: modif dans la BDD
    }
  }

  if (isLoading) return (<div><p><Image src={loading} width={20} height={20} alt="Loading" />Chargement de l'activité...</p></div>);
  if (!activite || activite === "No data") return (<p><span className="text-red-600 font-bold">Erreur :</span> Aucune activité trouvée.</p>);

  return (
    <div>
      <div className="mb-4 p-2 flex justify-between">
        <div>{(!modifying && !(activite === null)) && <TeButton onClick={setModifying} texte={"Modifier"}>Modifier</TeButton>}</div>
        {/* <button type="button" className="px-4 py-1 mr-5 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="submit" onClick={setModifying}>Modifier</button> */}
        <Link className="group p-1 transition-all border-gray-400 duration-200 rounded inline-block border hover:bg-gray-200" href="/">
          <span className="group-hover:-translate-x-1 duration-200 inline-block">&lt;-</span> Retour</Link>
      </div>
      <h1 className="mb-6">{modifying ? "Modification de " + activite[0].nom : activite[0].nom}</h1>

      {(modifying || activite === null) ?
        <form>
          <fieldset className="flex flex-row">
            <fieldset className="flex flex-col">
              <fieldset className="mt-2 flex flex-col">
                <label>Titre de l&apos;activité</label>
                <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded" type="text" value={titre}
                  onChange={(event) => setTitre(event.target.value)} name="activite[titre]" />
              </fieldset>
              <fieldset className="mt-2 flex flex-col">
                <label>Chargé de travaux</label>
                <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded" type="text" value={cdt}
                  onChange={(event) => setCdt(event.target.value)} name="activite[CdT]" />
              </fieldset>
              <fieldset className="mt-2 flex flex-col">
                <label>Exécutants</label>
                <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded" type="text" value={execs}
                  onChange={(event) => setExecs(event.target.value)} name="activite[Execs]" />
                {/* TODO: Mettre une possibilité de mettre plusieurs execs/Faire apparaitre une liste */}
              </fieldset>
              <fieldset className="mt-2 flex flex-col">
                <label>Description de l&apos;activité</label>
                <textarea className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded resize-y" cols="50" value={desc}
                  onChange={(event) => setDesc(event.target.value)} name="activite[desc]" maxLength="1000" />
              </fieldset>
              <fieldset className="mt-2 flex flex-col">
                <label>Fichiers joints</label>
                <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded" type="file" value={files}
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
          <div id="CT">
            <h2>Chargé de travaux</h2>
            <p>{cdtUser[0].nom}</p>
          </div>
          <div id="Execs">
            <h2>Exécutants</h2>
            <p></p>
          </div>
          <div id="Desc">
            <h2>Description</h2>
            <p>{activite[0].descript}</p>
          </div>
          <div id="Date">
            <h2>Date</h2>
            <p>{activite[0].date_activite}</p>
          </div>
        </div>
      }
    </div>
  );
}