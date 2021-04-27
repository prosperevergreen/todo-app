import React from "react";
import Box from "@material-ui/core/Box";
import TodoAppBar from "../../components/TodoAppBar/TodoAppBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import AppModal from "../../components/AppModal/AppModal";
import { useSelector } from "react-redux";

/**
 * A function that takes the app and login section components as props
 * Add app bar to the app section
 * @param {object} loginPage - Login coponent of the app
 * @param {object} appPage - in-app component of the todo app
 * @returns
 */
const AppLayout = ({ loginPage, appPage }) => {
	// Keep track of the screen witdth to adjust the app widh and backbround color
	// based on screen size
	const screenIsSM = useMediaQuery("(max-width:600px)");
	// Monitor the login state to display apropriate screen
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	return (
		<Box width="100vw" height="100vh" minHeight="500px" minWidth="300px">
			{isLoggedIn ? ( // Optionaly display the login screen or the app window depending on login state
				<Box
					bgcolor={screenIsSM ? "secondary.main" : "primary.light"}
					height="100%"
				>
					<TodoAppBar /> {/* App Bar */}
					<Box display="flex" height="92vh" alignItems="center" mt={1}>
						{/* App Content */}
						<Grid container justify="center">
							<Grid item xs={12} sm={10} md={8}>
								{appPage}
								{/* App component */}
							</Grid>
						</Grid>
					</Box>
					<AppModal />{" "}
					{/* Attach the modal component to be used my other components   */}
				</Box>
			) : (
				loginPage // Login component
			)}
		</Box>
	);
};

export default AppLayout;
