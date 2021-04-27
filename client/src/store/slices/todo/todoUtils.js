import axios from "axios";

/**
 * A function that creates an axios request object with the auth header set
 * 
 * @param {object} authCred - authorisation credetial object {data, token}
 * @returns {object}
 */
const todoRequest = (authCred) => axios.create({
	baseURL: "http://localhost:5000/api/todo",
	timeout: 5000,
    headers: {"Authorization": authCred}
});

/**
 * A function that makes a POST request create/add a new todo item
 * 
 * @param {object} cred - credetials to be used for the request {data, token} 
 * 
 * @returns {Promise<object>}
 */
export const addTodoItem = ({data, token}) =>{
    const authCred = `Bearer ${token}`
    return todoRequest(authCred).post("/",{
        ...data
    }).then(res=>res.data)
}

/**
 * A function that makes a *GET* request to fetch all the user todo items for a given category
 * 
 * @param {object} cred - credetials to be used for the request {token} 
 * 
 * @returns {Promise<object>}
 */
export const getAllTodoItems = ({categoryId, token}) =>{
    const authCred = `Bearer ${token}`
    return todoRequest(authCred).get(`/${categoryId}`).then(res=>res.data)
}

/**
 * A function that makes a *PUT* request to modify a todo item
 * 
 * @param {object} cred - credetials to be used for the request {data, todoId, token} 
 * 
 * @returns {Promise<object>}
 */
export const modifyTodoItem = ({data, todoId, token}) =>{
    const authCred = `Bearer ${token}`
    return todoRequest(authCred).put(`/${todoId}`,{
        ...data
    }).then(res=>res.data)
}

/**
 * A function that makes a *DELETE* request to modify a todo item
 * 
 * @param {object} cred - credetials to be used for the request {todoId, token} 
 * 
 * @returns {Promise<object>}
 */
export const deleteTodoItem = ({todoId, token}) =>{
    const authCred = `Bearer ${token}`
    return todoRequest(authCred).delete(`/${todoId}`).then(res=>res.data)
}

/**
 * A function for sorting categories based on their date
 *
 * @param {object} item1 - first item to be compared
 * @param {object} item2 - second item to be compared
 *
 * @returns
 */
 export const sortItems = (item1, item2) => {
	const date1 = new Date(item1.createdOn).getTime();
	const date2 = new Date(item2.createdOn).getTime();
	return date2 - date1;
};