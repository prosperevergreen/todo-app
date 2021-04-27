import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	setShowModal,
	setSelectedItem,
} from "../../store/slices/user/userSlice";

import {modifyTodoItemAsync} from "../../store/slices/todo/todoSlice"


const MODE = { e: "edit", d: "delete" };


const TodoItem = ({ todo }) => {
	const dispatch = useDispatch();

	// To temprariliy stores the HTML DOM Element over which the edit/delete menu will appear
	const [anchorEl, setAnchorEl] = useState(null);
	// Ref for accessing the DOM
	const moreButtonRef = useRef(null);
	// Get the token from the store
	const token = useSelector((state) => state.user.token);
	// Set the anchor (or element) over which the menu should appear
	const handleClick = () => {
		setAnchorEl(moreButtonRef.current);
	};

	/**
	 * Remove the menu from the element
	 */
	const handleClose = () => {
		setAnchorEl(null);
	};

	/**
	 * A function that handle the menu edit button clicked
	 */
	const handleEdit = () => {
		// Set's the selected item
		dispatch(setSelectedItem(todo));
		// Activates the display of the edit modal
		dispatch(setShowModal({ mode: MODE.e, show: true }));
		// Close/remove the menu
		handleClose();
	};

	/**
	 * A function that handle the menu delete button clicked
	 */
	const handleDelete = () => {
		// Set's the selected item
		dispatch(setSelectedItem(todo));
		// Activates the display of the delete modal
		dispatch(setShowModal({ mode: MODE.d, show: true }));
		// Close/remove the menu
		handleClose();
	};

	/**
	 * A function that handles the checking of a todo item
	 */
	const handleCheck = () =>{
		// Get item id
		const todoId = todo._id;
		// Form request data body
		const data = {
			done: !todo.done
		}
		// Send request to update data
		dispatch(modifyTodoItemAsync({data, todoId, token}))
	}


	return (
		<Box my={1}>
			<Paper>
				<Box pt={1}>
					<Grid container spacing={1}>
						<Grid item xs={2}>
							<Box display="flex" justifyContent="center">
								<div ref={moreButtonRef}>
									<IconButton
										aria-label="more"
										aria-controls="simple-menu"
										aria-haspopup="true"
										onClick={handleClick}
									>
										<MoreVertIcon />
									</IconButton>
								</div>
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleEdit}>Edit</MenuItem>
									<MenuItem onClick={handleDelete}>
										Delete
									</MenuItem>
								</Menu>
							</Box>
						</Grid>
						<Grid item xs={8}>
							<Box
								display="flex"
								flexDirection="column"
								justifyContent="center"
								height="100%"
							>
								<Box
									color="#444D63"
									textOverflow="ellipsis"
									overflow="hidden"
									whiteSpace="nowrap"
								>
									{todo.name}
								</Box>
								<Box>
									<Typography variant="overline" color="textSecondary">
									{new Date(todo.createdOn).toDateString()}
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={2}>
							<Box display="flex" justifyContent="center" alignItems="center">
								<Checkbox
								checked={todo.done}
								onChange={handleCheck}
								color="primary"
								/>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

export default TodoItem;
