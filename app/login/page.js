"use client"

import { useRouter } from 'next/navigation';
import { connectUser } from '../actions';
import { useState } from 'react';

export default function LoginPage() {
  const [red, setRed] = useState("px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border bg-white transition-all rounded");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userid = formData.get('userid');
    const password = formData.get('password');
    const stayConnected = formData.get('stayConnected') === 'on' ? true : false;

    await connectUser(formData);

    router.push("/");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-row">
        <form className="p-4" onSubmit={handleSubmit}>
          <fieldset name="login[]" className="flex flex-row border-t-4 border-double">
            <legend className="uppercase font-bold text-xl px-1 text-center">Connexion</legend>
            <fieldset className="flex flex-col">
              <fieldset className="flex flex-col mt-2">
                <label>Identifiant </label>
                <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border bg-white transition-all rounded"
                  type="text" name="userid" required />
              </fieldset>
              <fieldset className="flex flex-col mt-2">
                <label>Mot de passe </label>
                <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border bg-white transition-all rounded"
                  type="password" name="password" required />
              </fieldset>
              <fieldset className="flex flex-col mt-4">
                <button type="submit" className="p-2 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="submit" >Connexion</button>
              </fieldset>
            </fieldset>
          </fieldset>
        </form>
      </div>
    </div>
  );
}