import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import wallpaper from "../../assets/svg/login-wallpaper.svg";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import logo from "../../assets/svg/logo.svg";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import {
	loginUserAsync,
	registerUserAsync,
	setUserCred,
} from "../../store/slices/user/userSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
	wallpaper: {
		background: `url(${wallpaper}) no-repeat`,
		backgroundSize: "100% 100%",
		display: (value) => (value ? "none" : "block"),
		backgroundColor: theme.palette.primary.light,
	},
	loginArea: {
		color: "#444D63",
		height: "100vh",
	},
	loginBtn: {
		marginLeft: "auto",
		marginRight: "auto",
		paddingTop: "12",
		paddingBottom: "12",
	},
	loginForm: {
		paddingLeft: "128px",
		paddingRight: "128px",
	},
}));

const TYPE = { l: "LOGIN", r: "REGISTER" };
const ERROR_MSG = {
	emptyField: "EMAIL AND PASSWORD IS REQUIRED",
	tooShort: "PASSWORD MUST CONTAIN ALEAST 4 CHARACTERS",
	badFormat: "EMAIL MUST BE OF x@y.z FORMAT",
	incorrectCred: "WRONG EMAIL OR PASSWORD",
	duplicateCred: "EMAIL ALREADY EXISTS",
	networkError: "Network or server error",
};

const Login = () => {
	// Keep track of email input field
	const [email, setEmail] = useState("");
	// Keep track of password input field
	const [password, setPassword] = useState("");
	// Bool to show or hide password field
	const [showPassword, setShowPassword] = useState(false);
	// Error message to be displayed to user
	const [errorMsg, setErrorMsg] = useState("");
	// login/register state
	const [inLogin, setInLogin] = useState(true);
	// Screen size
	const screenIsSM = useMediaQuery("(max-width:1000px)");

	const classes = useStyles(screenIsSM);
	const dispatch = useDispatch();

	/**
	 * A function that validates the email format
	 *
	 * @param {string} email - email address to be tested
	 * @returns {boolean}
	 */
	const emailValidator = (email) => {
		return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
			email
		);
	};

	// on page load, Check if a user was logged in
	useEffect(() => {
		// Try accessing the persistant memory
		const userCred = getPersistantData("cred");
		// check if user exists
		if (userCred !== null) {
			setEmail(userCred.email);
			setPassword(userCred.password);
			// Try login user in user
			dispatch(loginUserAsync(userCred)).then(handleLoginRes);
		}
	}, []);

	/**
	 * A function used to reteive data from session storage
	 *
	 * @param {string} key - key of the memory to be accessed
	 * @returns {object}
	 */
	const getPersistantData = (key) => {
		return JSON.parse(sessionStorage.getItem(key));
	};

	/**
	 * A function that completes login/register user action
	 *
	 * @param {object} payload - response data
	 * @param {object} cred - user credentials {email, password}
	 * @returns
	 */
	const handleLoginRes = (action) => {
		const payload = action.payload;
		// If server doesn't respond or no network
		if (!payload) return setErrorMsg(ERROR_MSG.networkError);

		// Get response status
		const status = payload.status;

		// Get response data
		const resData = payload.data;

		// Check if response is not ok
		if (status !== 200) {

			// Get server error message
			const errMsg = resData.error;

			// Display error message
			setErrorMsg(errMsg || ERROR_MSG.networkError);
			return;
		}

		// Register & login user to system
		dispatch(setUserCred({ cred: { email, password }, ...resData }));

		// Reset input fields
		setEmail("");
		setPassword("");
	};

	/**
	 * A function that handles the subission of user data for login/register
	 *
	 * @param {object} e - submit event object
	 * @returns
	 */
	const handleSubmit = (e) => {
		e.preventDefault();

		setErrorMsg("");

		// Check if password or email is empty
		if (email === "" || password === "") {
			setErrorMsg(ERROR_MSG.emptyField);
			return;
		}

		// Check if email is valid
		if (!emailValidator(email)) {
			setErrorMsg(ERROR_MSG.badFormat);
			return;
		}

		// Check if password is of proper length
		if (password.length < 4) {
			setErrorMsg(ERROR_MSG.tooShort);
			return;
		}

		// Create user data
		const userCred = { email, password };


		// Check page state
		if (inLogin) {
			// Try to go user in
			dispatch(loginUserAsync(userCred)).then(handleLoginRes);
		} else {
			// Try register user
			dispatch(registerUserAsync(userCred)).then(handleLoginRes);
		}
	};

	return (
		<Box height="100%">
			<Grid container>
				<Grid item md={7} className={classes.wallpaper}></Grid>
				<Grid item xs>
					<Grid
						container
						justify="center"
						alignItems="center"
						className={classes.loginArea}
					>
						<Grid item xs={9} md={8}>
							<Box mt={3}>
								<Box>
									<img src={logo} alt="app logo" width="100%" loading="lazy" />
								</Box>
								<Box my={15}>
									<Box textAlign="center" fontSize={24}>
										{inLogin ? "Sign-in!" : "Sign-up!"}
									</Box>
									<Box mt={5}>
										<form noValidate autoComplete="off" onSubmit={handleSubmit}>
											<Box mb={2}>
												<TextField
													id="email"
													label="EMAIL"
													variant="outlined"
													fullWidth
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													type="email"
													error={errorMsg !== ""}
												/>
											</Box>
											<Box my={2}>
												<FormControl
													variant="outlined"
													fullWidth
													error={errorMsg !== ""}
												>
													<InputLabel htmlFor="outlined-adornment-password">
														PASSWORD
													</InputLabel>
													<OutlinedInput
														id="outlined-adornment-password"
														type={showPassword ? "text" : "password"}
														value={password}
														onChange={(e) => setPassword(e.target.value)}
														endAdornment={
															<InputAdornment position="end">
																<IconButton
																	aria-label="Password"
																	onClick={() => setShowPassword(!showPassword)}
																	onMouseDown={() =>
																		setShowPassword(!showPassword)
																	}
																	edge="end"
																>
																	{showPassword ? (
																		<Visibility />
																	) : (
																		<VisibilityOff />
																	)}
																</IconButton>
															</InputAdornment>
														}
														labelWidth={85}
														fullWidth
													/>

													{errorMsg !== "" && (
														<FormHelperText id="component-error-text">
															<Box
																textAlign="center"
																display="block"
																component="span"
																fontSize={12}
																style={{ textTransform: "uppercase" }}
															>
																{errorMsg}
															</Box>
														</FormHelperText>
													)}
												</FormControl>
											</Box>
											<Box my={2}>
												<Button
													fullWidth
													variant="contained"
													size="large"
													color="primary"
													type="submit"
												>
													{inLogin ? TYPE.l : TYPE.r}
												</Button>
											</Box>
											<Box>
												<Button
													size="large"
													color="primary"
													onClick={() => setInLogin(!inLogin)}
													disableRipple
													fullWidth
												>
													{inLogin ? TYPE.r : TYPE.l}
												</Button>
											</Box>
										</form>
									</Box>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Login;
