import { useNavigate } from "react-router-dom";
import { useState, useEffect, React, useContext } from "react";
import UserService from "../Services/UserService";
import AuthContext from "../Context/AuthContext";
import AuthService from "../Services/AuthService";

// On rajoute le token
const LoginPage = () => {
    const navigate = useNavigate();

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    // On aurait pu mettre const [user, setUser] = useState({});
    const { setIsAuthentified } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        // bloque rafraichissement de la page
        e.preventDefault();
        try {
            // On aurait pu déclarer une constante exemple id = {mail, password}
            const response = await UserService.login({ mail, password });
            console.log(response.data.token);


            // Pour appeler le token partour, on utilise un hook react : useContext dans un nouveau dossier dans src
            const token = response.data.token
            // Envoi le token dans le local storage
            localStorage.setItem('token', token);
            // Token généré au moment de la connexion

            AuthService.setAxiosToken();

            // indique que sur toutes les pages, on est autorisés
            setIsAuthentified(true);

            alert("Connexion réussie");
            // A la place de l'alerte, on peut mettre un navigate 
            navigate('/allTasks');

        } catch (error) {
            console.log(error);
            alert("erreur de connexion");
            // On peut naviguer vers une page

        }
    }

    AuthService.isValid();

    return <>
        <div className="login">
            <h1>Login Page</h1>


            <form className="formLogin" onSubmit={handleSubmit}>
                <label>
                    Mail :
                    <input className="inputLogin"
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        // on peut écrire required={true}
                        required />
                </label>

                <label>
                    Mot de passe :
                    <input className="inputLogin"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </label>
                <input className="formSubmit"
                    type="submit"
                    value="Connexion" />
            </form>



            <button className="btnInscription" onClick={() => { navigate('/inscription') }}>Inscription</button>
        </div>
    </>;
}

export default LoginPage;