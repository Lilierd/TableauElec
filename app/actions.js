'use server' //Pour que les données et interactions arrivent côté serveur

import axios, { Axios } from 'axios';
import { NextRequest } from 'next/server';

/**
 * Connexion utilisateur
 * @param {[pseudo, password, stayConnected]} formData 
 */
export async function connectUser(formData) { //Connexion
    console.log("Connexion : " + formData.pseudo + " " + formData.password + " " + formData.stayConnected);
}

/**
 * Crée une nouvelle ligne dans la table "Activite" 
 * @param {FormData} formData
 */
export async function createActivity(formData) {
    console.log("Nouvelle activité : " + formData.get('titre') + " " + formData.get('cdt') + " " + formData.get('execs') + " " + formData.get('desc'));
    const data = JSON.stringify({
        titre: formData.get('titre'),
        cdt: formData.get('cdt'),
        desc: formData.get('desc')
    });

    const res = await fetch('http://141.94.237.226:8080/api/activite/', { method: 'POST', body: data });

    if (!res.ok)
        return;
}

/**
 * Modifie une ligne dans la table "Activite"
 * @param {[titre, cdt, execs, desc, files]} formData
 */
export async function modifyActivity(formData) {
    console.log("Connexion : " + formData.titre + " " + formData.cdt + " " + formData.execs + " " + formData.desc);
    //TODO: modif dans la BDD
}

/**
 * Request (GET) all users from database and returns them
 * @returns List of users
 */
export async function getAllUsers() {
    const res = await fetch('http://141.94.237.226:8080/api/users/');

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

    const res = await fetch('http://141.94.237.226:8080/api/users/', { method: 'PATCH', body: data });

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
    const res = await fetch('http://141.94.237.226:8080/api/activite/', { headers: { 'cache-control': 'no-cache' } });

    if (!res.ok)
        return;

    const activites = await res.json();

    console.log(activites);

    return activites.body;
}
