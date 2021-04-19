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
    setCurrentCategory
} from "../../store/slices/user/userSlice";
import { getAllTodoItemsAsync } from "../../store/slices/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const PAGE = { l: "login", c: "category", t: "todo" };
const MODE = { e: "edit", d: "delete" };

const CategoryItem = ({ category }) => {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const moreButtonRef = useRef(null);
	const token = useSelector((state) => state.user.token);

	const handleClick = () => {
		setAnchorEl(moreButtonRef.current);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = () => {
		dispatch(setSelectedItem(category));
		dispatch(setShowModal({ mode: MODE.e, show: true }));
		handleClose();
	};

	const handleDelete = () => {
		dispatch(setSelectedItem(category));
		dispatch(setShowModal({ mode: MODE.d, show: true }));
		handleClose();
	};

	const handleGoto = () => {
		const categoryId = category._id;
		dispatch(setCurrentCategory(category));
		dispatch(getAllTodoItemsAsync({ categoryId, token })).then((action)=>{
            if(action.payload){
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
