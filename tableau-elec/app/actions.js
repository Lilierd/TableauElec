'use server' //Pour que les données et interactions arrivent côté serveur

export async function connectUser(formData) { //Connexion
    console.log("Connexion : " + formData.pseudo + " " + formData.password + " " + formData.stayConnected);
}
