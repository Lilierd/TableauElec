'use server' //Pour que les données et interactions arrivent côté serveur

import axios, { Axios } from 'axios';

/**
 * Connexion utilisateur
 * @param {[pseudo, password, stayConnected]} formData 
 */
export async function connectUser(formData) { //Connexion
    console.log("Connexion : " + formData.pseudo + " " + formData.password + " " + formData.stayConnected);
}

/**
 * Crée une nouvelle ligne dans la table "Activite" 
 * @param {[titre, cdt, execs, desc, files]} formData
 */
export async function createActivity(formData) {
    console.log("activite : " + formData.titre + " " + formData.cdt + " " + formData.execs + " " + formData.desc);

    const res = await fetch('http://localhost:8080/api/sendActivite/', { method: 'POST', body: JSON.stringify({ formData }) });

    if (!res.ok)
        return;

    //console.log(res);
    //TODO: injection dans la BDD
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
 * Request (POST) all users from database and returns them
 * @returns List of users
 */
export async function getAllUsers() {
    const res = await fetch('http://141.94.237.226:8080/api/getUsers/', { method: 'POST' });

    if(!res.ok)
        return;

    const users = await res.json();
    
    return users.body;
}

/**
 * Request (POST) all users from database and returns them
 * @returns List of users
 */
export async function getAllActivites() {
    const res = await fetch('http://141.94.237.226:8080/api/activite/');

    if(!res.ok)
        return;

    const activites = await res.json();
    
    return activites.body;
}
