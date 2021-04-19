// The store that keeps persistant data as well as updates the components on change

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice"; 
import categoryReducer from "./slices/category/categorySlice"; 
import todoReducer from "./slices/todo/todoSlice"; 

export const store = configureStore({
	reducer: {
		user: userReducer, // User store section
		category: categoryReducer, // Category store section
        todo: todoReducer // Todo* store section
	},
});
