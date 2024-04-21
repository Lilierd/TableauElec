'use server' //Pour que les données et interactions arrivent côté serveur

import { conn } from "@/controller/db";
import pg from 'pg';

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
    //TODO: injection dans la BDD

    const client = await conn.connect();
    const res = await client.query("SELECT * FROM users WHERE id = $1", [1]);
    console.log(res.rows[0]);

    client.release();
    console.log(conn);
}

/**
 * Modifie une ligne dans la table "Activite"
 * @param {[titre, cdt, execs, desc, files]} formData
 */
export async function modifyActivity(formData) {
    console.log("Connexion : " + formData.titre + " " + formData.cdt + " " + formData.execs + " " + formData.desc);
    //TODO: modif dans la BDD
}
