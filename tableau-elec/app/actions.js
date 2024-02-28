'use server' //Pour que les données et interactions arrivent côté serveur

export async function connectUser(formData) { //Connexion
    const rawFormData = {
        pseudo: formData.get('login[pseudo]'),
        password: formData.get('login[password]'),
        stayConnected: formData.get('login[stayConnected]'),
    };

    console.log(rawFormData.pseudo + " " + rawFormData.password + " " + rawFormData.stayConnected);
}
