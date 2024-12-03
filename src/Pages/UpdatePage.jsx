import { useNavigate, useParams } from "react-router-dom";
import TaskService from "../Services/TaskService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const UpdatePage = () => {
    const { idTask } = useParams();
    const [task, setTask] = useState({});
    const token = localStorage.getItem('token');
    console.log(token);
    const navigate = useNavigate();
    

    // Affiche la tache, met les infos dans les input
    const fetchTaskById = async () => {
        try {
            const response = await TaskService.getTaskById(idTask)
            // console.log(response.data);

            // Je récupère les infos de la tâche
            setTask(response.data[0]);
            console.log(response.data[0]);
            
            
        } catch (error) {
            console.log(error);
        }
    }

    // // Capte les changement dans les input
    const handleChange = (e) => {
        // console.log(task);        
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        // bloquer le rafraichissement de la page
        e.preventDefault();
        try {
            // On envoie les nouvelles infos
            const response = await TaskService.updateTask(idTask, task)
            console.log(response);
            toast.success("Tâche modifiée");

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTaskById()
    }, [idTask]);


    return <>
        <div id="modifTask">
            <h1>Modifier ma tâche :</h1>
            <form className="updateTask" onSubmit={handleSubmit}>
                <input className="inputUpdateTask" name="nameTask" value={task.nameTask} onChange={handleChange}/>
                
                <input className="inputUpdateTask" name="descriptionTask" value={task.descriptionTask} onChange={handleChange}/>
                <div>
                <label>
                    <input
                        type="radio"
                        name="idState"
                        value={1}
                        checked={task.idState == 1}
                        onChange={handleChange}
                    />
                    A faire
                </label>
                <label>
                    <input
                        type="radio"
                        name="idState"
                        value={3}
                        checked={task.idState == 3}
                        onChange={handleChange}
                    />
                    En cours
                </label>
                <label>
                    <input
                        type="radio"
                        name="idState"
                        value={2}
                        checked={task.idState == 2}
                        onChange={handleChange}
                    />
                    Fait
                </label>

                </div>
                <input className="taskSubmit" type="submit" value="Modifier" onClick={() => { navigate('/allTasks')}}/>
            </form>
        </div>

    </>;
}

export default UpdatePage;