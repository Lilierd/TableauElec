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
    console.log("Connexion : " + formData.titre + " " + formData.cdt + " " + formData.execs + " " + formData.desc);

    let data = { content: formData }
    const response = await fetch('http://localhost:8080/api/sendActivite', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(response.body);
    /* axios.post('http://localhost:8080/api/sendActivite', data)
        .then((response) => {
            console.log(response)
        })
        .catch((e) => { console.log(e) }); */
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
