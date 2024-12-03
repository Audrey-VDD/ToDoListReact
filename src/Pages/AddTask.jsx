import { useState } from "react";
import TaskService from '../Services/TaskService';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTask = () => {

    // Créer un état qu'on viendra mettre à jour quand on renseigne les champs de la tâche
    const [task, setTask] = useState({});
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    // fonction handleChange sur chaque champ pour qu'il prenne en compte ce qu'on y écrit
    const handleChange = (e) => {
        console.log(e.target.value);
        // On récupère le nom pour avoir l'info du champ et pas seulement ce qu'on tape en vrac
        console.log(e.target.name);
        // copire colle les champs d'avant renseigné et ça ajoute le reste des infos pour valider tous les champs avec leurs infos
        // on aura {"nameTask": toto}
        setTask({ ...task, [e.target.name]: e.target.value });
    }


    const handleSubmit = async (e) => {
        // bloquer le rafraichissement de la page pour voir le changeent dans la console
        e.preventDefault();
        // on envoi les données "task" quand on submit le formulaire
        try {
            const response = await TaskService.addTask(task)
            console.log(response);
            toast.success("Tâche ajoutée avec succès");
            navigate('/allTasks')
        } catch (error) {
            console.log(error);
        }
        console.log(task);
    }

    return <>
        {/* Fonction onSubmit pour dire qu'à la soumission du formulaire, on fait quelque chose et on peut l'appeler handleSubmit */}
        {/* On rajoute un name dans chaque champ pour que ce qui y est écrit soit associé aux infos de la BDD */}
        <form className="addTask" onSubmit={handleSubmit}>
            <h1>Ajout d'une tâche</h1>
            <label>
                Nom de la tâche :
                <input className="addInput" onChange={handleChange} name="nameTask" />
            </label>
            <label>
                Description :
                <input className="addInput" onChange={handleChange} name="descriptionTask" />
            </label>

            <div>
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
                        value={2}
                        checked={task.idState == 2}
                        onChange={handleChange}
                    />
                    Fait
                </label>
            </div>

            <input className="taskSubmit" type="submit" value="Ajout"/>

        </form>

    </>;
}

export default AddTask;