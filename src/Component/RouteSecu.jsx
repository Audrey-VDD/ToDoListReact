import { Outlet } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const RouteSecu = () => {
    const {isAuthentified} = useContext(AuthContext);
    return <>
    {/* Si tu es connecté, je te laisse passer et sinon, je te renvoie à la loginPage */}
    {/* Le déclarer dans l'app.jsx */}
    {isAuthentified ? <Outlet/> : <LoginPage/>}    
    </>;
}
 
export default RouteSecu;