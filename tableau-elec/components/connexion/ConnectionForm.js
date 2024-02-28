import { connectUser } from "@/app/actions";

export function ConnectionForm({ formData }) {

    return (
        <form className="bg-white p-4 rounded shadow-xl" action={connectUser}>
            <fieldset name="login[]" className="flex flex-row border-t-4 border-double">
                <legend className="uppercase font-bold text-l text-center px-1">Connexion</legend>
                <fieldset className="flex flex-col">
                    <fieldset className="flex flex-col mt-2">
                        <label>Pseudo </label>
                        <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border bg-gray-100 transition-all rounded" type="text" name="login[pseudo]" />
                    </fieldset>
                    <fieldset className="flex flex-col mt-2">
                        <label>Mot de passe </label>
                        <input className="px-2 py-1 hover:bg-gray-200 focus:bg-gray-200 border bg-gray-100 transition-all rounded" type="password" name="login[password]" />
                    </fieldset>
                    <fieldset className="flex flex-col mt-4">
                        <label>
                            <input className="sr-only peer" type="checkbox" name="login[stayConnected]" />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                            <span>Rester connecté.e</span>
                        </label>
                    </fieldset>
                    <fieldset className="flex flex-col mt-4">
                        <input type="submit" className="p-2 rounded bg-orange-500 hover:bg-orange-800 transition-all" id="submit" value="Connexion" />
                    </fieldset>
                </fieldset>
            </fieldset>
        </form>
    );
}