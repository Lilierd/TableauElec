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

    const res = await fetch('http://localhost:8080/api/sendActivite/', {method: 'POST', body: JSON.stringify({ formData })});    //TODO: utiliser 'response' pour renvoyer une donnée

    if(!res.ok)
        throw new Error('Failed to fetch data on new activity sending');

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
