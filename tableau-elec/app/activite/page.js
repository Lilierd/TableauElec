"use client"

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function ActivitePage() {
  const searchParams = useSearchParams();
  const activite = searchParams.get("activite");

  const formSubmitHandler = () => {

  }

  var legende = ""; //Si création ou modif
  if(activite === null)
    legende = "Création d'une activité";
  else
    legende = "Modification de " + activite;

  return (
    <div>
      <div className="mb-4"><Link className="group p-1 transition-all border-gray-400 duration-200 rounded inline-block border hover:bg-gray-200" href="/">
        <span className="group-hover:-translate-x-1 duration-200 inline-block">&lt;-</span> Retour</Link>
      </div>
      <h1 className="mb-6">{legende}</h1>
      <form>
        <fieldset className="flex flex-row">
          <fieldset className="flex flex-col">
            <fieldset className="mt-2 flex flex-col">
              <label>Titre de l'activité</label>
              <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded" type="text" name="activite[titre]" />
            </fieldset>
            <fieldset className="mt-2 flex flex-col">
              <label>Chargé de travaux</label>
              <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded" type="text" name="activite[CdT]" />
            </fieldset>
            <fieldset className="mt-2 flex flex-col">
              <label>Exécutants</label>
              <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded" type="text" name="activite[Execs]" />
              {/* TODO: Mettre une possibilité de mettre plusieurs execs */}
            </fieldset>
            <fieldset className="mt-2 flex flex-col">
              <label>Description de l'activité</label>
              <textarea className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded resize-y" cols="50" name="activite[desc]" maxLength="1000" />
            </fieldset>
            <fieldset className="mt-2 flex flex-col">
              <label>Description de l'activité</label>
              <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border transition-all rounded" type="file" name="activite[fichiers]" multiple />
            </fieldset>
            <fieldset className="flex flex-row mt-4">
              <button type="button" className="px-4 py-1 mr-5 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="submit" onClick={formSubmitHandler}>Modifier</button>
              <Link href='/'><button type="button" className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="cancel">Annuler</button></Link>
            </fieldset>
          </fieldset>
        </fieldset>
      </form>
    </div>
  );
}