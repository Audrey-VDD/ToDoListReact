import UserService from "../Services/UserService";
import AuthContext from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import { useContext, useEffect, useState } from "react";

const UserPage = () => {
    const { isAuthentified, user } = useContext(AuthContext)
    console.log(user);

    const [users, setUsers] = useState([]);


    const fetchUsers = async () => {
        try {
            const response = await UserService.getAllUsers();
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    AuthService.isValid();

    return <>

        <div className="usersListing">
            <h1>USERS</h1>
            {/* Ajouter une condition ternaire pour que le bouton ne s'affiche que si le role est un admin */}
            <ul className="usersList">
                {users.map((userList) => {
                    return <li className="eachUser">{userList.firstname} {userList.lastname} {userList.role} {user.role === "admin" && <bouton>Supprimer</bouton>}</li>
                })}
            </ul>
        </div>

    </>;
}

export default UserPage;