// Dans mon appli, je veux savoir si je suis authentifié ou pas, on colle cette partie en app.jsx
import { createContext } from "react";

export default createContext ({
    isAuthentified: false,
    setIsAuthentified: (value) => {},
    // gérer user dans toute l'application
    user : {},
    setUser : (value) => {}
});