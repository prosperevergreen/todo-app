import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { useRef, useState } from "react";
import {
	setShowModal,
	setSelectedItem,
	setPage,
	setCurrentCategory,
} from "../../store/slices/user/userSlice";
import { getAllTodoItemsAsync } from "../../store/slices/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const PAGE = { l: "login", c: "category", t: "todo" };
const MODE = { e: "edit", d: "delete" };

const CategoryItem = ({ category }) => {
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
		dispatch(setSelectedItem(category));
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
		dispatch(setSelectedItem(category));
		// Activates the display of the delete modal
		dispatch(setShowModal({ mode: MODE.d, show: true }));
		// Close/remove the menu
		handleClose();
	};

	/**
	 * A function that hamdgle navigation to the todo section
	 */
	const handleGoto = () => {
		// Set parent category id used for fetch the todo's for that category
		const categoryId = category._id;
		// Set category as active item
		dispatch(setCurrentCategory(category));
		// Request for todo items for the given category
		dispatch(getAllTodoItemsAsync({ categoryId, token })).then((action) => {
			if (action.payload) {
				dispatch(setPage(PAGE.t));
			}
		});
	};

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
									<MenuItem onClick={handleDelete}>Delete</MenuItem>
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
									{category.name}
								</Box>
								<Box>
									<Typography variant="overline" color="textSecondary">
										{new Date(category.createdOn).toDateString()}
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={2}>
							<Box display="flex" justifyContent="center" alignItems="center">
								<IconButton aria-label="more" onClick={handleGoto}>
									<ArrowForwardIosIcon />
								</IconButton>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

export default CategoryItem;
