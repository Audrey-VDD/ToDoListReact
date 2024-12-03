import axios from "axios";

function getAllUsers(){
    return axios.get("http://127.0.0.1:3000/todoapi/user/getAllUser")
}
// Ajoute lien pur ajouter une tache "task"
function addUser(user){
    return axios.post("http://127.0.0.1:3000/todoapi/user/addUser", user)
}

//  ,user on passe les infos +user on concatene et on peut faire les deux
//  souvent une virgule avec post ou patch
// Création de la route pour le login
// On peut créer une constante pour ne pas recopier tout le temps le http avec une constante : 
const API_URL = "http://127.0.0.1:3000";
function login(idUser) {
    return axios.post(API_URL+"/todoapi/user/login", idUser);
}
export default {
    getAllUsers,
    addUser,
    login
};