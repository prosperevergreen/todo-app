import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import logo from "../../assets/svg/logo.svg";

import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/user/userSlice";

const TodoAppBar = () => {
	const dispatch = useDispatch();
	return (
		<Box>
			<AppBar elevation={2} position="static" color="default">
				<Toolbar>
					<Box py={1} display="flex" alignItems="center" width="100%">
						<Box flexGrow="1">
							<img src={logo} height="30" alt="app logo" loading="lazy" />
						</Box>
						<Button
							size="large"
							color="inherit"
							onClick={() => dispatch(logoutUser())}
						>
							Logout
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default TodoAppBar;
