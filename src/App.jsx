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

function App() {

  return <>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
      <Routes>
        <Route path='/' element={<LoginPage></LoginPage>}></Route>
        <Route path='/add' element={<AddTask></AddTask>}></Route>
        <Route path='/inscription' element={<InscriptionPage/>}></Route>
        <Route path='/allTasks' element={<TasksPage/>}></Route>
        <Route path='/updateTask/:idTask' element={<UpdatePage/>}></Route>
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
  </>
}

export default App
