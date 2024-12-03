import { useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";
import UserService from "../Services/UserService";

// On rajoute le token
const LoginPage = () => {
    const navigate = useNavigate();

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    // On aurait pu mettre const [user, setUser] = useState({});


    const handleSubmit = async (e) => {
        // bloque rafraichissement de la page
        e.preventDefault();
        try {
            // On aurait pu déclarer une constante exemple id = {mail, password}
            const response = await UserService.login({ mail, password });
            console.log(response.data.token);
            // setToken(response.data.token);
            const token = response.data.token



            // Envoi l'id dans la page suivante
            localStorage.setItem('token', token);
            // Token généré au moment de la connexion
            alert("Connexion réussie");
            // A la place de l'alerte, on peut mettre un navigate 
            navigate('/allTasks');
        } catch (error) {
            console.log(error);
            alert("erreur de connexion");
            // On peut naviguer vers une page

        }
    }

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