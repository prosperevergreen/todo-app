import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	registerUser,
	loginUser,
	savePersistantData,
	clearPersistantData,
} from "./userUtils";

const PAGE = { l: "login", c: "category", t: "todo" };
const MODE = { e: "edit", d: "delete" };


const initialState = {
	status: "idle",
	token: "",
	user: null,
	isLoggedIn: false,
	currPage: PAGE.l,
	selectedItem: null,
	currentCategory: null,
	showModal: false,
	modalMode: ""
};


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const registerUserAsync = createAsyncThunk(
	"user/registerUser",
	async (userData) => {
		const data = await registerUser(userData);
		// The value we return becomes the `fulfilled` action payload
		return data;
	}
);

export const loginUserAsync = createAsyncThunk(
	"user/loginUser",
	async (userData) => {
		const data = await loginUser(userData);
		// The value we return becomes the `fulfilled` action payload
		return data;
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		resetUserData: (state) => {
			state.status = "idle";
			state.token = "";
			state.user = null;
			state.isLoggedIn = false;
			state.currPage = PAGE.l;
			state.selectedItem = null;
			clearPersistantData();
		},
		setPage: (state, action) => {
			state.currPage = action.payload;
		},
		setCurrentCategory: (state, action) => {
			state.currentCategory = action.payload;
		},
		setSelectedItem: (state, action) => {
			state.selectedItem = action.payload;
		},
		setUserCred: (state, action) => {
			const { cred, user, token } = action.payload;
			state.user = user;
			state.token = token;
			state.isLoggedIn = true;
			state.currPage = PAGE.c
			savePersistantData("cred", cred);
			savePersistantData("user", user);
			savePersistantData("token", token);
		},
		setShowModal: (state, action)=>{
			const {mode, show} = action.payload;
			state.showModal = show;
			state.modalMode = mode;
		}
	},
	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder
			.addCase(registerUserAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(registerUserAsync.fulfilled, (state, action) => {
				state.status = "idle";
			})
			.addCase(registerUserAsync.rejected, (state) => {
				state.status = "error";
			})
			.addCase(loginUserAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(loginUserAsync.fulfilled, (state, action) => {
				state.status = "idle";
			})
			.addCase(loginUserAsync.rejected, (state) => {
				state.status = "error";
			});
	},
});

export const {
	resetUserData,
	setPage,
	setSelectedItem,
	setUserCred,
	setShowModal,
	setCurrentCategory
} = userSlice.actions;

export default userSlice.reducer;
