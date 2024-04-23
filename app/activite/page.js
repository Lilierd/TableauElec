"use client"

import { TeButton } from "@/components/TeButton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { createActivity, modifyActivity } from "@/app/actions";  // * <------- Données de création/modif envoyées ici

export default function ActivitePage() {
  const searchParams = useSearchParams();
  const activite = searchParams.get("activite"); // TODO: Remplacer le titre par un id

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
    const formData = {
      titre: titre,
      cdt: cdt,
      execs: execs,
      desc: desc,
      files: files,
    };

    if (activite === null) {
      createActivity(formData); 


      //TODO: rediriger sur cette page mais avec activite=activite en GET
    }
    else {
      await modifyActivity(formData);
      //TODO: modif dans la BDD
    }
  }

  var legende = ""; // * Si création ou modif
  if (activite === null)
    legende = "Création d'une activité";
  else {
    legende = activite; //TODO: Recuperer les data de l'activité dans les var qui sont en value des input
  }
  
  return (
    <div>
      <div className="mb-4 p-2 flex justify-between">
        <div>{(!modifying && !(activite === null)) && <TeButton onClick={setModifying} texte={"Modifier"}>Modifier</TeButton>}</div>
        {/* <button type="button" className="px-4 py-1 mr-5 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="submit" onClick={setModifying}>Modifier</button> */}
        <Link className="group p-1 transition-all border-gray-400 duration-200 rounded inline-block border hover:bg-gray-200" href="/">
          <span className="group-hover:-translate-x-1 duration-200 inline-block">&lt;-</span> Retour</Link>
      </div>
      <h1 className="mb-6">{modifying ? "Modification de " + legende : legende}</h1>

      {(modifying || activite === null) ?
        <form>
          <fieldset className="flex flex-row">
            <fieldset className="flex flex-col">
              <fieldset className="mt-2 flex flex-col">
                <label>Titre de l'activité</label>
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
                <label>Description de l'activité</label>
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

          </div>
          <div id="Execs">

          </div>
          <div id="Desc">

          </div>
        </div>
      }
    </div>
  );
}