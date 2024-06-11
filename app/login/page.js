"use client"

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const identifiant = formData.get('identifiant');
    const password = formData.get('password');
    const stayConnected = formData.get('stayConnected') === 'on' ? true : false;

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifiant, password, stayConnected }),
    });

    if (response.ok) {
      router.push('/');
    } else {
      // Handle errors
    }
  };

  return (
    <div className="flex flex-row">
      <form className="p-4" onSubmit={handleSubmit}>
        <fieldset name="login[]" className="flex flex-row border-t-4 border-double">
          <legend className="uppercase font-bold text-l px-1">Connexion</legend>
          <fieldset className="flex flex-col">
            <fieldset className="flex flex-col mt-2">
              <label>Pseudo </label>
              <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border bg-white transition-all rounded"
                type="text" name="identifiant" required />
            </fieldset>
            <fieldset className="flex flex-col mt-2">
              <label>Mot de passe </label>
              <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border bg-white transition-all rounded"
                type="password" name="password" required />
            </fieldset>
            <fieldset className="flex flex-col mt-4">
              <label>
                <input className="sr-only peer" type="checkbox" name="stayConnected" />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                <span>Rester connecté.e</span>
              </label>
            </fieldset>
            <fieldset className="flex flex-col mt-4">
              <button type="submit" className="p-2 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="submit" >Connexion</button>
            </fieldset>
          </fieldset>
        </fieldset>
      </form>
    </div>
    );
}