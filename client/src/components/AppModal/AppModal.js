import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Divider from "@material-ui/core/Divider";
import { useSelector, useDispatch } from "react-redux";
import {
	setShowModal,
	setSelectedItem,
} from "../../store/slices/user/userSlice";
import {
	modifyCategoryItemAsync,
	deleteCategoryItemAsync,
} from "../../store/slices/category/categorySlice";
import {
	modifyTodoItemAsync,
	deleteTodoItemAsync,
} from "../../store/slices/todo/todoSlice";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	button: {
		width: "45%",
	},
}));

const PAGE = { l: "login", c: "category", t: "todo" };
const MODE = { e: "edit", d: "delete" };

export default function AppModal() {

	const dispatch = useDispatch();
	const classes = useStyles();

	// For temporarily storing the edit input.
	const [edit, setEdit] = useState("");

	// Bool for showing modal
	const showModal = useSelector((state) => state.user.showModal);
	// Modal mode => "edit" or "delete" modal
	const mode = useSelector((state) => state.user.modalMode);
	// The current item requesting for the modal
	const activeItem = useSelector((state) => state.user.selectedItem);
	// The token for completing modal request => "edit" or "delete" requests;
	const token = useSelector((state) => state.user.token);
	// The current page => "category" or "todo"
	const page = useSelector((state) => state.user.currPage);

	// Gets the name of the item that activated the modal => 
	useEffect(() => {
		if (showModal && mode === MODE.e) {
			setEdit(activeItem.name);
		}
	}, [showModal]);


	/**
	 * A function that handles the closing of the modal
	 */
	const handleClose = () => {
		// Deselects the active item
		dispatch(setSelectedItem(null));
		// Removes the modal (by reseting)
		dispatch(setShowModal({ mode: "", show: false }));
	};

	/**
	 * A function that handles the completion of editing an item
	 * 
	 * @param {object} e - submit event object 
	 * @returns {void}
	 */
	const handleEdit = (e) => {
		e.preventDefault();
		// If edit field is empty, do nothing
		if (edit === "") return;

		// Set the item id to be used for by request data
		const itemId = activeItem._id;

		// Form the edit request data with the date
		const data = {
			name: edit,
			date: new Date(Date.now()).toISOString(),
		};

		// If in category page, send request to category endpoint
		if (page === PAGE.c) {
			dispatch(modifyCategoryItemAsync({ categoryId: itemId, data , token})).then(
				(action) => {
					if (action.payload) {
						handleClose();
					}
				}
			);
			return;
		}

		// If in todo page, send request to todo endpoint
		if (page === PAGE.t) {
			dispatch(modifyTodoItemAsync({ todoId: itemId, data, token })).then((action) => {
				if (action.payload) {
					handleClose();
				}
			});
			return;
		}
	};

	/**
	 * A function that handles the completion of deleting an item
	 */
	const handleDelete = () => {
		// Set the item id to be used for by request data
		const itemId = activeItem._id;

		// If in category page, send request to category endpoint
		if (page === PAGE.c) {
			dispatch(deleteCategoryItemAsync({ categoryId: itemId, token })).then(
				(action) => {
					if (action.payload) {
						handleClose();
					}
				}
			);
		}

		// If in todo page, send request to todo endpoint
		if (page === PAGE.t) {
			dispatch(deleteTodoItemAsync({ todoId: itemId, token })).then(
				(action) => {
					if (action.payload) {
						handleClose();
					}
				}
			);
		}
	};

	// Edit modal context template i.e the model shown when the user tries to edit an item
	const editModal = (
		<Box style={{ outline: "0" }} width="100%">
			<Grid container justify="center">
				<Grid item xs={8} md={5}>
					<Paper>
						<Box p={2}>
							<Typography
								style={{ textTransform: "uppercase" }}
								variant="h6"
								color="initial"
								gutterBottom
								id="edit-modal-title"
							>
								Edit Item
							</Typography>
							<form noValidate autoComplete="off" onSubmit={handleEdit}>
								<Box display="flex" flexDirection="column" mx="3">
									<TextField
										id="edit"
										label={edit.length === 0? "Input required" : "Edit item"}
										variant="outlined"
										align="center"
										error={edit.length === 0}
										value={edit}
										onChange={(e) => setEdit(e.target.value)}
									/>
									<Box display="flex" justifyContent="space-around" mt={2}>
										<Button
											className={classes.button}
											variant="contained"
											color="secondary"
											onClick={handleClose}
										>
											Cancel
										</Button>
										<Button
											className={classes.button}
											variant="contained"
											color="primary"
											type="submit"
											disabled={edit.length === 0}
										>
											Confirm
										</Button>
									</Box>
								</Box>
							</form>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
	
	// Delete modal context template i.e the model shown when the user tries to delete an item
	const confirmModal = (
		<Box style={{ outline: "0" }} width="100%">
			<Grid container justify="center">
				<Grid item xs={8} md={5}>
					<Paper>
						<Box p={2}>
							<Typography
								style={{ textTransform: "uppercase" }}
								variant="h6"
								color="initial"
								gutterBottom
								id="edit-modal-title"
								align="center"
							>
								Confirm delete
							</Typography>
							<Box display="flex" flexDirection="column" mx="3">
								<Divider />
								<Box display="flex" justifyContent="space-around" mt={2}>
									<Button
										className={classes.button}
										variant="contained"
										color="secondary"
										onClick={handleClose}
									>
										Cancel
									</Button>
									<Button
										className={classes.button}
										variant="contained"
										color="primary"
										onClick={handleDelete}
									>
										Confirm
									</Button>
								</Box>
							</Box>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);

	return (
		<div>
			<Modal
				aria-labelledby="edit-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={showModal}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={showModal}>{mode === MODE.e ? editModal : confirmModal}</Fade>
			</Modal>
		</div>
	);
}
