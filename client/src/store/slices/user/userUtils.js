import axios from "axios";

const authRequest = ({email, password}) =>axios.create({
	baseURL: "http://localhost:5000/api/auth",
	timeout: 5000,
    auth:{
        username: email,
        password: password
    }
});


export const registerUser = (credentials) =>{
    // const credential = `Basic ${btoa(`${email}:${password}`)}`
    return authRequest(credentials).post("/").then(res=>res.data).catch(err=>console.log(err))
}

export const loginUser = (credentials) =>{
    // const credential = `Basic ${btoa(`${email}:${password}`)}`
    return authRequest(credentials).get("/").then(res=>res.data).catch(err=>console.log(err))
}

export const savePersistantData = (key, data)=>{
    localStorage.setItem(key, JSON.stringify(data));
}

export const getPersistantData = (key)=>{
    return JSON.parse(localStorage.getItem(key));
}

export const clearPersistantData = ()=>{
    return localStorage.clear();
}

