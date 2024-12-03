import { useEffect, useRef, useState } from "react";
import TaskService from "../Services/TaskService";
import { toast } from "react-toastify";
import recycler from "../assets/recycler.png";
import modify from "../assets/modify.png";
import { useNavigate, useParams } from "react-router-dom";


const TasksPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    console.log(token);
     
    const [tasks, setTasks] = useState([]);
    // Constante des tasks en fonction de leurs états
    const [taskState1, setTaskState1] = useState([]);
    const [taskState2, setTaskState2] = useState([]);
    const [taskState3, setTaskState3] = useState([]);

    // Récupération des infos getAllTasks
    const fetchTasks = async () => {
        try {
            const response = await TaskService.getTasksByIdUser()
            // Met à jour tasks en fonction des data, puis en fonction des états
            setTasks(response.data)
            console.log(response.data);
            
            setTaskState1(response.data.filter((task) => task.nameState === "toDo"));
            setTaskState2(response.data.filter((task) => task.nameState === "done"));
            setTaskState3(response.data.filter((task) => task.nameState === "inProgress"));
            console.log(taskState2);
            
        } catch (error) {
            console.log(error);
        }
    };
    
    // Permet de supprimer une task par son id
    const handleSupp = async (idTask) => {
        console.log(idTask);
        try {
            // const response = await TaskService.deleteTask(idTask);
            await TaskService.deleteTask(idTask);
            
            // Je rappelle le fetch pour mettre à jour les infos
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    }

    // stocke index de la task qui bouge sans changer sa valeur
    const dragtaskState3 = useRef(0)
    const dragtaskState2 = useRef(0)
    const dragtaskState1 = useRef(0)
    // stocke index tasks survolées sans changer leur valeur
    const draggedOvertaskState3 = useRef(0)
    const draggedOvertaskState2 = useRef(0)
    const draggedOvertaskState1 = useRef(0)


    // Trie les tasks après le drag and drop
    const handleSortState3 = () => {
        // On copie la taskState3
        const taskState3Copy = [...taskState3]
        // on définit la tache en train de glisser
        const draggedTaskState3 = taskState3Copy[dragtaskState3.current];
        // suppression task de sa place initiale
        taskState3Copy.splice(dragtaskState3.current, 1);
        // insère task parmi les autres tasks sans échange, la mettant en dessous de celle déjà là
        // 0 permet de ne pas supprimer la task
        taskState3Copy.splice(draggedOvertaskState3.current, 0, draggedTaskState3);

        // je définis les nouvelles tâches
        setTaskState3(taskState3Copy)
    }
    const handleSortState2 = () => {
        const taskState2Copy = [...taskState2]
        const draggedTaskState2 = taskState2Copy[dragtaskState2.current];

        taskState2Copy.splice(dragtaskState2.current, 1);
        taskState2Copy.splice(draggedOvertaskState2.current, 0, draggedTaskState2);

        setTaskState2(taskState2Copy)
    }
    const handleSortState1 = () => {
        const taskState1Copy = [...taskState1]
        const draggedTaskState1 = taskState1Copy[dragtaskState1.current];

        taskState1Copy.splice(dragtaskState1.current, 1);
        taskState1Copy.splice(draggedOvertaskState1.current, 0, draggedTaskState1);

        setTaskState1(taskState1Copy)
    }


    useEffect(() => {
        fetchTasks();
    }, []);


    return <>

       
        <div className="tabTask">
            <div id="divAddTask">
                <button id="btnAddTask" onClick={() => { navigate('/add') }}>Ajouter une tâche</button>
            </div>


            <div id="divTaskToDo">
                <h1>Taches en cours</h1>

                <ul className="taskList">

                    {taskState3.map((task, index) => {
                        return <li 
                        className="taskListInProgress" 
                        key={task.idTask}
                        // indique que c'est glissable
                        draggable
                        // donne un index au début du drag
                        onDragStart={() => (dragtaskState3.current = index)}
                        // donne une position quand c'est draggé
                        onDragEnter={() => (draggedOvertaskState3.current = index)}
                        // réorganise après le drag grâce à handleSort
                        onDragEnd={handleSortState3}
                        // bloque rafraichissement de la page
                        onDragOver={(e) => e.preventDefault()}
                        >
                            {task.nameTask}
                            <br />
                            <img src={modify} id="imgModify" alt="pictureModify" onClick={() => { navigate('/updateTask/'+task.idTask) }} />
                            <img src={recycler} id="recycler" alt="pictureRecycler" onClick={() => handleSupp(task.idTask)} />
                        </li>
                    })}
                </ul>
            </div>


            <div>
                <h1>Taches à faire</h1>
                <ul className="taskList">
                    {taskState1.map((task, index) => {
                        return <li className="taskListToDo" key={task.idTask}
                        draggable
                        onDragStart={() => (dragtaskState1.current = index)}
                        onDragEnter={() => (draggedOvertaskState1.current = index)}
                        onDragEnd={handleSortState1}
                        onDragOver={(e) => e.preventDefault()}
                        >
                            {task.nameTask}
                            <br />
                            <img src={modify} id="imgModify" alt="pictureModify" onClick={() => { navigate('/updateTask/'+task.idTask) }}  />
                            <img src={recycler} id="recycler" alt="pictureRecycler" onClick={() => handleSupp(task.idTask)} />
                        </li>
                    })}
                </ul>
            </div>
            <div>
                <h1>Taches faites</h1>
                <ul className="taskList">
                    {taskState2.map((task, index) => {
                        return <li className="taskListDone" key={task.idTask}
                        draggable
                        onDragStart={() => (dragtaskState2.current = index)}
                        onDragEnter={() => (draggedOvertaskState2.current = index)}
                        onDragEnd={handleSortState2}
                        onDragOver={(e) => e.preventDefault()}
                        >{task.nameTask}
                            <br />
                            <img src={modify} id="imgModify" alt="pictureModify" onClick={() => { navigate('/updateTask/'+task.idTask) }}  />
                            <img src={recycler} id="recycler" alt="pictureRecycler" onClick={() => handleSupp(task.idTask)} />
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </>;
}

export default TasksPage;