import axios from "axios";

/**
 * A function that creates an axios request object with the auth header set
 *
 * @param {object} authCred - authorisation credetial object {data, token}
 * @returns {object}
 */
const categoryRequest = (authCred) =>
	axios.create({
		baseURL: "http://localhost:5000/api/category",
		timeout: 5000,
		headers: { Authorization: authCred },
	});

/**
 * A function that makes a POST request create/add a new category item
 *
 * @param {object} cred - credetials to be used for the request {data, token}
 *
 * @returns {Promise<object>}
 */
export const addCategoryItem = ({ data, token }) => {
	const authCred = `Bearer ${token}`;
	return categoryRequest(authCred)
		.post("/", {
			...data,
		})
		.then((res) => res.data);
};

/**
 * A function that makes a *GET* request to fetch all the user category items
 *
 * @param {object} cred - credetials to be used for the request {token}
 *
 * @returns {Promise<object>}
 */
export const getAllCategoryItems = (token) => {
	const authCred = `Bearer ${token}`;
	return categoryRequest(authCred)
		.get("/")
		.then((res) => res.data);
};

/**
 * A function that makes a *PUT* request to modify a category item
 *
 * @param {object} cred - credetials to be used for the request {data, categoryId, token}
 *
 * @returns {Promise<object>}
 */
export const modifyCategoryItem = ({ data, categoryId, token }) => {
	const authCred = `Bearer ${token}`;
	return categoryRequest(authCred)
		.put(`/${categoryId}`, {
			...data,
		})
		.then((res) => res.data);
};

/**
 * A function that makes a *DELETE* request to modify a category item
 *
 * @param {object} cred - credetials to be used for the request {categoryId, token}
 *
 * @returns {Promise<object>}
 */
export const deleteCategoryItem = ({ categoryId, token }) => {
	const authCred = `Bearer ${token}`;
	return categoryRequest(authCred)
		.delete(`/${categoryId}`)
		.then((res) => res.data);
};

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
