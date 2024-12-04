import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Créer une fonction pour que axios intègre le token
function setAxiosToken() {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers["Authorization"] = "Bearer " + token;
    } else {
        delete axios.defaults.headers["Authorization"];
    }
}

function logout() {
    delete axios.defaults.headers['Authorization'];
    localStorage.removeItem('token');
}

// stocke idUser
function getIdUser() {
    const token = localStorage.getItem('token');
    // Si token reçu et valide
    if (token && isValid()) {
        const decodedToken = jwtDecode(token);
        // return decodedToken.id;
        return {
            id: decodedToken.id,
            role: decodedToken.role
        }
        // si on en veut plusieurs, on peut écrire return { id: decodedToken.id, email: decodedToken.email} et on renommerait getUser
    } else {
        return {};
    }
}

function isValid() {
    const token = localStorage.getItem('token');
    if (token) {
        // Véirfier que le token est valide
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        // on multiplie par mille pour que ce soit en milisecondes
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout();
            return false;
        } else {
            // quand le token est bon, j'appelle mon token
            setAxiosToken();
            return true;
        }

    } else {

        // Si le token n'est pas présent, il est forcément faux
        return false;
    }
}


export default { isValid, setAxiosToken, getIdUser }