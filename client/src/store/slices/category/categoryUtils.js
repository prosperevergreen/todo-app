import axios from "axios";

const categoryRequest = (authCred) =>
	axios.create({
		baseURL: "http://localhost:5000/api/category",
		timeout: 5000,
		headers: { Authorization: authCred },
	});

export const addCategoryItem = ({ data, token }) => {
	const authCred = `Bearer ${token}`;
	return categoryRequest(authCred)
		.post("/", {
			...data,
		})
		.then((res) => res.data);
};

export const getAllCategoryItems = (token) => {
	const authCred = `Bearer ${token}`;
	return categoryRequest(authCred)
		.get("/")
		.then((res) => res.data);
};

export const modifyCategoryItem = ({ data, categoryId, token }) => {
	const authCred = `Bearer ${token}`;
	return categoryRequest(authCred)
		.put(`/${categoryId}`, {
			...data,
		})
		.then((res) => res.data);
};

export const deleteCategoryItem = ({ categoryId, token }) => {
	const authCred = `Bearer ${token}`;
	return categoryRequest(authCred)
		.delete(`/${categoryId}`)
		.then((res) => res.data);
};

export const savePersistantData = (key, data) => {
	sessionStorage.setItem(key, JSON.stringify(data));
};

export const getPersistantData = (key) => {
	return JSON.parse(sessionStorage.setItem(key));
};

export const clearPersistantData = () => {
	return sessionStorage.clear();
};

export const sortItems = (item1, item2) => {
	const date1 = new Date(item1.createdOn).getTime();
	const date2 = new Date(item2.createdOn).getTime();
	return date2 - date1;
};
