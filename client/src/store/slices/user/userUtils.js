import axios from "axios";

/**
 * A function that creates an axios instance with the provided credentials as auth header
 * 
 * @param {object} credentials - an object containing {email, password} 
 * @returns {object} axios instance with auth header set with basic auth
 */
const authRequest = ({email, password}) =>axios.create({
	baseURL: "http://localhost:5000/auth",
	timeout: 5000,
    auth:{
        username: email,
        password: password
    }
});

/**
 * A fucntion that make a POST request to register a new user
 * 
 * @param {object} credentials - an object containing {email, password} of the user
 * @returns {Promise<object>} Server response
 */
export const registerUser = (credentials) =>{
    // const credential = `Basic ${btoa(`${email}:${password}`)}`
    return authRequest(credentials).post("/").then(res=>res)
}

/**
 * A fucntion that make a GET request to login a user
 * 
 * @param {object} credentials - an object containing {email, password} of the user
 * @returns {Promise<object>} Server response
 */
export const loginUser = (credentials) =>{
    // const credential = `Basic ${btoa(`${email}:${password}`)}`
    return authRequest(credentials).get("/").then(res=>res)
}

/**
 * A function that saves data to session storage
 * 
 * @param {string} key - key to be used to save the data
 * @param {object} data - data to be saved
 */
export const savePersistantData = (key, data)=>{
    sessionStorage.setItem(key, JSON.stringify(data));
}

/**
 * A function that retreives data from session storage
 * 
 * @param {string} key - key to be used to save the data
 * @returns {object} - data to stored with the provided key
 */
export const getPersistantData = (key)=>{
    return JSON.parse(sessionStorage.getItem(key));
}

/**
 * A function that clears the session storage
 * 
 */
export const clearPersistantData = ()=>{
    return sessionStorage.clear();
}

