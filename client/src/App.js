import React, { useEffect, useState } from "react";
import AppLayout from "./Layout/AppLayout/AppLayout";
import AppSection from "./views/AppSection/AppSection";
import AppLogin from "./views/Login/Login";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import { useSelector } from "react-redux";

const PAGE = { l: "login", c: "category", t: "todo" };

// Custom themes to be used in the app
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#444D63",
			light: "#B0D9F5",
		},
		secondary: {
			main: "#E6E6E5",
			light: "#F5F5F5",
		},
		text: {
			primary: "#444D63",
		},
	},
});



function App() {

	// As the list page is reused, however, the data changes, so an array told
	// The data to be supplied to the list it provided
	const [displayData, setDisplayData] = useState([]);
	// Tracking the current page is used to know which data to supply
	const page = useSelector((state) => state.user.currPage);
	// Tracking the category items is used to populate the page when the 
	// page is active same with the todo items
	const categoryItems = useSelector((state) => state.category.categoryItems);
	const todoItems = useSelector((state) => state.todo.todoItems);

	// Use Effect is used to update the changes to the generic array that supplies the data
	// It is import that both the data change and page navigaion is monitored
	useEffect(() => {
		if (page === PAGE.c) {
			setDisplayData(categoryItems);
		}
		if (page === PAGE.t) {
			setDisplayData(todoItems);
		}
	}, [page, categoryItems, todoItems]);

	// The app layout rendes the app section or the login screen based on
	// the state of the app (user is logged in or not)
	return (
		<ThemeProvider theme={theme}>
			<AppLayout
				appPage={<AppSection page={page} sectionData={displayData} />}
				loginPage={<AppLogin />}
			/>
		</ThemeProvider>
	);
}

export default App;
