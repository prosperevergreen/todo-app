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
	const token = useSelector((state) => state.user.token);
	
	const [anchorEl, setAnchorEl] = useState(null);
	const moreButtonRef = useRef(null);
	
	const dispatch = useDispatch()


	const handleClick = () => {
		setAnchorEl(moreButtonRef.current);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = () => {
		dispatch(setSelectedItem(todo));
		dispatch(setShowModal({ mode: MODE.e, show: true }));
		handleClose();
	};

	const handleDelete = () => {
		dispatch(setSelectedItem(todo));
		dispatch(setShowModal({ mode: MODE.d, show: true }));
		handleClose();
	};

	const handleCheck = () =>{
		const todoId = todo._id;
		const data = {
			done: !todo.done
		}
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
