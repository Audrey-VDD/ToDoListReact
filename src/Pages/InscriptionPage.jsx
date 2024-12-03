import { useEffect, useState } from "react";
import UserService from "../Services/UserService";
import { toast } from "react-toastify";

const InscriptionPage = () => {
    const [user, setUser] = useState({});
    // ça remplace les const [firstname, setFirstname] = useState(""); const [lastname, setLastname] = useState(""); const [mail.....etc
    // Et dans le oneChange={setFirstname} et pas de handleChange

    const handleChange = (e) => {
        console.log(e.target.value);
        console.log(e.target.name);
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await UserService.addUser(user)
            console.log(response);
            toast.success("Inscription réussie"); 
        } catch (error) {
            console.log(error);
        }
        console.log(user);
        
    }
    
    return <>
        <div className="inscription">
            <h1>Inscription</h1>
            <form className="formInscription" onSubmit={handleSubmit}>
                <label>
                    Prénom : 
                    <input className="inscriptionInput" type="text" required onChange={handleChange} name="firstname"/>
                </label>
                <label>
                    Nom : 
                    <input className="inscriptionInput" type="text" required onChange={handleChange} name="lastname"/>
                </label>
                <label>
                    Mail :
                    <input type="" className="inscriptionInput" required onChange={handleChange} name="mail"/>
                </label>
                <label>
                    Mot de passe :
                    <input type="password"  className="inscriptionInput" required  onChange={handleChange} name="password"/>
                </label>
                <input className="formSubmit" type="submit" value="Inscription" />
            </form>
        </div>
    </>;
}

export default InscriptionPage;