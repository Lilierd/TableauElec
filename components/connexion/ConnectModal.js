"use client"

import { useEffect, useState } from "react";
import { connectUser } from "@/app/actions";  // <------- Données de connexion envoyées ici

export default function ConnectModal({ isOpen }) {
  var test = useState(false);
  isOpen = test[0];
  var majOpen = test[1];

  const closeModal = () => majOpen(false);
  const openModal = () => majOpen(true);

  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [stayConnected, setStayConnected] = useState(false);

  const [classesPseudo, setClassesPseudo] = useState(false);
  const [classesPassword, setClassesPassword] = useState(false);

  useEffect(() => {
    document.addEventListener('click', function (event) {
      if (event.target != null)
        if (event.target.id === "modal" || event.target.id === "croix1") {
          event.stopPropagation();
          closeModal();
        }
      if (event.target.id === "connexionBouton") {
        event.stopPropagation();
        openModal();
      }
    });
  });

  const formSubmitHandler = () => {
    if (pseudo === '')
      setClassesPseudo(true);
    else
      setClassesPseudo(false);
    if (password === '')
      setClassesPassword(true);
    else
      setClassesPassword(false);

    if (pseudo != '' && password != '') {
      const formData = {
        pseudo: pseudo,
        password: password,
        stayConnected: stayConnected,
      }

      connectUser(formData);
      closeModal();
    }
  }

  return (
    <div>
      {isOpen && <dialog
        className={`fixed left-0 top-0 w-full h-full bg-black bg-opacity-20 z-50 overflow-auto backdrop-blur flex justify-center items-center transition-all`} id="modal">
        <div className="flex flex-col bg-white p-1 rounded">
          <div className="flex flex-row justify-end"><div className="flex flex-col"><button className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-800 transition-all" id="croix1">X</button></div></div>
          <div className="flex flex-row">
            <form className="bg-white p-4 rounded shadow-xl">
              <fieldset name="login[]" className="flex flex-row border-t-4 border-double">
                <legend className="uppercase font-bold text-l text-center px-1">Connexion</legend>
                <fieldset className="flex flex-col">
                  <fieldset className="flex flex-col mt-2">
                    <label>Pseudo </label>
                    <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border bg-gray-100 transition-all rounded"
                      type="text" name="login[pseudo]" value={pseudo} onChange={(event) => setPseudo(event.target.value)} />
                    {classesPseudo && <p id="erreurPseudo" className="text-red-400 text-xs">Ce champ doit être saisi.</p>}
                  </fieldset>
                  <fieldset className="flex flex-col mt-2">
                    <label>Mot de passe </label>
                    <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border bg-gray-100 transition-all rounded"
                      type="password" name="login[password]" value={password} onChange={(event) => setPassword(event.target.value)} />
                    {classesPassword && <p id="erreurPassword" className="text-red-400 text-xs">Ce champ doit être saisi.</p>}
                  </fieldset>
                  <fieldset className="flex flex-col mt-4">
                    <label>
                      <input className="sr-only peer" type="checkbox" name="login[stayConnected]"
                        value={stayConnected} onChange={(event) => setStayConnected(event.target.checked)} />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                      <span>Rester connecté.e</span>
                    </label>
                  </fieldset>
                  <fieldset className="flex flex-col mt-4">
                    <button type="button" className="p-2 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="submit" onClick={formSubmitHandler}>Connexion</button>
                  </fieldset>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </dialog>}
    </div>
  );
}
