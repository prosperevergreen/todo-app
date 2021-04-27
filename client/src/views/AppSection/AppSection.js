import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TodoItem from "../../components/TodoItem/TodoItem";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { setPage, setCurrentCategory } from "../../store/slices/user/userSlice";

import "./AppSection.css";

import {
	getAllCategoryItemsAsync,
	addCategoryItemAsync,
} from "../../store/slices/category/categorySlice";
import { addTodoItemAsync } from "../../store/slices/todo/todoSlice";

import { useSelector, useDispatch } from "react-redux";

const PAGE_TITLE = { category: "todo category", todo: "todo item" };
const PAGE = { l: "login", c: "category", t: "todo" };

const AppSection = ({ page, sectionData }) => {
	const dispatch = useDispatch();

	// Keep track of the search field input
	const [searchTerm, setSearchTerm] = useState("");
	// Keep track of add field input
	const [addTerm, setAddTerm] = useState("");
	// Keep track of the screen size
	const screenIsSM = useMediaQuery("(max-width:600px)");
	// Get user token from redux store
	const token = useSelector((state) => state.user.token);
	// Get current category used to keep track of the catefory when moved
	const currentCategory = useSelector((state) => state.user.currentCategory);

	// Load fetch category items on page load
	useEffect(() => {
		if (page === PAGE.c) {
			dispatch(getAllCategoryItemsAsync(token));
		}
	}, []);

	/**
	 * A function that filters the result based on the searchTerm
	 */
	const searchResult = sectionData.filter((data) =>
		data.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	/**
	 * A function that handles the submit event of adding an item
	 * 
	 * @param {object} e - submit event object 
	 * @returns 
	 */
	const handleAddItem = (e) => {
		e.preventDefault();

		// If the input field is empty do nothing
		if (addTerm === "") return;

		// If on category section 
		if (page === PAGE.c) {
			// Form request data for modifying server data
			const data = { name: addTerm };
			// post update to server
			dispatch(addCategoryItemAsync({ token, data })).then((action) => {
				if (action.payload) {
					setAddTerm("");
				}
			});
			return;
		}

		// If on todo section
		if (page === PAGE.t) {
			// Form request data for modifying server data
			const data = { name: addTerm, categoryId: currentCategory._id };
			// post update to server
			dispatch(addTodoItemAsync({ token, data })).then((action) => {
				if (action.payload) {
					setAddTerm("");
				}
			});
		}
	};

	return (
		<Paper elevation={screenIsSM ? 0 : 1}>
			<Box
				p={2}
				height="90vh"
				borderRadius="inherit"
				bgcolor="secondary.main"
				display="flex"
				flexDirection="column"
			>
				<Box borderBottom="1px solid #ccc">
					<Typography
						style={{ textTransform: "uppercase" }}
						variant="h4"
						color="initial"
					>
						{page === PAGE.t && (
							<IconButton
								onClick={() => {
									dispatch(setCurrentCategory(null));
									dispatch(setPage(PAGE.c));
								}}
								aria-label="more"
							>
								<ArrowBackIosIcon />
							</IconButton>
						)}
						{PAGE_TITLE[page]} {/** Title of a section */}
					</Typography>
				</Box>
				{/* <Box flexGrow="1" pt={1} overflow="scroll" > */}
				<Box px={1} my={2}>
					<TextField
						autoComplete="off"
						fullWidth
						id="search"
						label="Search..."
						variant="outlined"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					{/** Search form section */}
				</Box>
				<Box
					mb={2}
					overflow="auto"
					style={{ overflowX: "hidden" }}
					height="100%"
					display="flex"
					flexDirection="column"
					borderRadius={5}
					px={1}
					border="1px solid #ccc"
					bgcolor="#e0e0e0"
					// className="RemoveScroll"
				>
					{searchResult.map((value) => {
						return page === PAGE.t ? (
							<TodoItem key={value._id} todo={value} />
						) : (
							<CategoryItem key={value._id} category={value} />
						);
					})}
				</Box>
				{/* </Box> */}
				<form noValidate autoComplete="off" onSubmit={handleAddItem}>
					<Box display="flex" mt="auto">
						<Box flexGrow="1" bgcolor="white" borderRadius={4}>
							<TextField
								fullWidth
								id="add"
								label={`Add ${page}`}
								variant="outlined"
								value={addTerm}
								onChange={(e) => {
									setAddTerm(e.target.value);
								}}
							/>
						</Box>
						<Box ml={1}>
							<Fab
								color="primary"
								disabled={addTerm.length === 0}
								aria-label="add"
								type="submit"
							>
								<AddIcon />
							</Fab>
						</Box>
					</Box>
				</form>
			</Box>
		</Paper>
	);
};

export default AppSection;
