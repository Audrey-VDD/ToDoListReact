import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/LoginPage'
import AddTask from './Pages/AddTask'
import { ToastContainer } from 'react-toastify';
import InscriptionPage from './Pages/InscriptionPage';
import TasksPage from './Pages/TasksPage';
import UpdatePage from './Pages/UpdatePage';
import { useState } from 'react';
import AuthContext from './Context/AuthContext';
import AuthService from './Services/AuthService';
import RouteSecu from './Component/RouteSecu';
import UsersPage from './Pages/UsersPage';

function App() {
  // Par défaut, je ne suis pas connecté
  const [isAuthentified, setIsAuthentified] = useState(AuthService.isValid());
  // Si getUser n'existe pas, ce sera nul, sinon, j'aurais un objet avec infos du user
  const [user, setUser] = useState(AuthService.getIdUser());

  return <>
    {/* Je peux appeler authContext dans toutes mes pages */}
    <AuthContext.Provider value={{ isAuthentified, setIsAuthentified, user, setUser }}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
        <Routes>
          <Route path='/' element={<LoginPage></LoginPage>}></Route>
          <Route path='/inscription' element={<InscriptionPage />}></Route>


          {/* Routes protégées */}
          <Route element={<RouteSecu></RouteSecu>}>
            <Route path='/allTasks' element={<TasksPage />}></Route>
            <Route path='/add' element={<AddTask></AddTask>}></Route>
            <Route path='/updateTask/:idTask' element={<UpdatePage />}></Route>
            <Route path='/users' element={<UsersPage></UsersPage>}></Route>
          </Route>

        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          // si on peut glisser déposer
          draggable
          pauseOnHover
          // soit noir, soit blanc, soit coloré. En coloré, si c'est succès, ce sera vert
          theme="colored"
        />
      </BrowserRouter>
    </AuthContext.Provider>
  </>
}

export default App
