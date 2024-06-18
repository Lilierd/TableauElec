'use server' //Pour que les données et interactions arrivent côté serveur

import { signIn, signOut } from '@/auth/auth';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { cookies } from 'next/headers';

const baseUrl = "http://"+process.env.SERVER_IP+":"+process.env.SERVER_PORT;

/**
 * Connexion utilisateur
 * @param {FormData} formData 
 */
export async function connectUser(formData) { //Connexion
    try {
        return await signIn('credentials', { userid: formData.get("userid"), password: formData.get("password") });
    } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case 'CredentialsSignin':
              return 'Mauvais identifiants.ddd';
            default:
              return "Quelque chose s'est mal passé.";
          }
        }
      }
}

export async function logOut() {
    try {
        cookies().delete("userid");
        return await signOut();
    } catch(error)
    {
        if(isRedirectError(error))
            throw error;
        console.log("Erreur Déconnexion : " + error);
    }
}

/**
 * Crée une nouvelle ligne dans la table "Activite" 
 * @param {FormData} formData
 * @returns {int} new activity_id
 */
export async function createActivity(formData) {
    const data = JSON.stringify({
        titre: formData.get('titre'),
        cdt: formData.get('cdt'),
        rep: formData.get('rep'),
        desc: formData.get('desc')
    });

    const id = await fetch(baseUrl+'/api/activite', { method: 'POST', body: data })
    .then((res) => res.json())
    .then((data) => {
        return data.body;
    });
    
    return id;
}

/**
 * Modifie une ligne dans la table "Activite"
 * @param {FormData} formData
 */
export async function modifyActivity(formData) {
    const data = JSON.stringify({
        id_activite: formData.get('id_activite'),
        titre: formData.get('titre'),
        cdt: formData.get('cdt'),
        rep: formData.get('rep'),
        execs: formData.get('execs'),
        desc: formData.get('desc')
    });
    
    const res = await fetch(baseUrl+'/api/activite', { method: 'PATCH', body: data });

    if (!res.ok)
        return;

    return true;
}

/**
 * Modifie une ligne dans la table "Activite"
 * @param {int} id
 */
export async function deleteActivity(id) {
    const res = await fetch(baseUrl+'/api/activite', { method: 'DELETE', body: id });

    if (!res.ok)
        return;

    return true;
}

/**
 * Request (GET) all users from database and returns them
 * @returns List of users
 */
export async function getAllUsers() {
    const res = await fetch(baseUrl+'/api/users');

    if (!res.ok)
        return;

    const users = await res.json();

    return users.body;
}

/**
 * Request (UPDATE) all users from database and returns them
 * @param {FormData} formData
 * @returns Nothing
 */
export async function modifyUser(formData) {
    const data = JSON.stringify({
        id_utilisateur: formData.get('id_utilisateur'),
        nom: formData.get('nom'),
        id_role: formData.get('id_role')
    });

    const res = await fetch(baseUrl+'/api/users', { method: 'PATCH', body: data });

    if (!res.ok)
        return;

    const users = await res.json();

    return users.body;
}

/**
 * Request (POST) all users from database and returns them
 * @returns List of users
 * @deprecated
 */
export async function getAllActivites() {
    const res = await fetch(baseUrl+'/api/activite', { headers: { 'cache-control': 'no-cache' } });

    if (!res.ok)
        return;

    const activites = await res.json();

    console.log(activites);

    return activites.body;
}


export async function postComment(formData) {
    const data = JSON.stringify({
        id_utilisateur: formData.get('id_utilisateur'),
        titre: formData.get('titre'),
        texte: formData.get('message'),
        id_activite: formData.get('id_activite')
    });

    const res = await fetch(baseUrl+'/api/forum/', { headers: { 'cache-control': 'no-cache' }, method: 'POST', body: data });

    return res.ok;
}
