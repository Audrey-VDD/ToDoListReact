import axios from "axios";

function getAllTasks(){
    return axios.get("http://127.0.0.1:3000/todoapi/tasks/allTasks")
}
function getTaskById(idTask) {
    return axios.get("http://127.0.0.1:3000/todoapi/tasks/getTaskByIdTask/"+idTask)
}

// Ajoute lien pur ajouter une tache "task"
function addTask(task){
    const token = localStorage.getItem('token');
    return axios.post("http://127.0.0.1:3000/todoapi/tasks/addTask", task, {
        headers: {
            "authorization": "Bearer " + token,
        }
    })
}

function deleteTask(idTask){
    return axios.delete("http://127.0.0.1:3000/todoapi/tasks/deleteTaskById/"+ idTask)
}

function updateTask(idTask,task){
    const token = localStorage.getItem('token');
    return axios.patch("http://127.0.0.1:3000/todoapi/tasks/updateTask/"+ idTask, task, {
        headers: {
            "authorization": "Bearer " + token,
        }
    })
}


function getTasksByIdUser () {
    const token = localStorage.getItem('token');
    return axios.get("http://127.0.0.1:3000/todoapi/tasks/getTaskByIdUser", {
        headers: {
            "authorization": "Bearer " + token,
        }
    })
}
export default {
    getAllTasks,
    addTask,
    deleteTask,
    updateTask,
    getTaskById,
    getTasksByIdUser
}