import axios from "axios";

const todoRequest = (authCred) => axios.create({
	baseURL: "http://localhost:5000/api/todo",
	timeout: 5000,
    headers: {"Authorization": authCred}
});


export const addTodoItem = ({data, token}) =>{
    const authCred = `Bearer ${token}`
    return todoRequest(authCred).post("/",{
        ...data
    }).then(res=>res.data)
}

export const getAllTodoItems = ({categoryId, token}) =>{
    const authCred = `Bearer ${token}`
    return todoRequest(authCred).get(`/${categoryId}`).then(res=>res.data)
}

export const modifyTodoItem = ({data, todoId, token}) =>{
    const authCred = `Bearer ${token}`
    return todoRequest(authCred).put(`/${todoId}`,{
        ...data
    }).then(res=>res.data)
}

export const deleteTodoItem = ({todoId, token}) =>{
    const authCred = `Bearer ${token}`
    return todoRequest(authCred).delete(`/${todoId}`).then(res=>res.data)
}


export const savePersistantData = (key, data)=>{
    localStorage.setItem(key, JSON.stringify(data));
}

export const getPersistantData = (key)=>{
    return JSON.parse(localStorage.setItem(key));
}

export const clearPersistantData = ()=>{
    return localStorage.clear();
}

