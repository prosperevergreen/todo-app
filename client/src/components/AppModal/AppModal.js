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
import { setShowModal,  setSelectedItem } from "../../store/slices/user/userSlice";
import { modifyCategoryItemAsync,  deleteCategoryItemAsync } from "../../store/slices/category/categorySlice";
import { modifyTodoItemAsync,  deleteTodoItemAsync } from "../../store/slices/todo/todoSlice";




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
	const [edit, setEdit] = useState("");
    
	const showModal = useSelector(state => state.user.showModal)
    const mode = useSelector(state => state.user.modalMode)
    const activeItem = useSelector(state => state.user.selectedItem)
    const token = useSelector((state) => state.user.token);
    const page = useSelector((state) => state.user.currPage);

    useEffect(() => {
        if(showModal){
            setEdit(activeItem.name)            
        }
    }, [showModal])


    const handleClose = () =>{
        dispatch(setSelectedItem(null))
        dispatch(setShowModal({ mode: "", show: false }));
    }

    const handleEdit = () =>{
        const data = {
            name: edit,
            date: new Date(Date.now()).toISOString()
        }
        const categoryId = activeItem._id
        if(page === PAGE.c){
            dispatch(modifyCategoryItemAsync({categoryId, token, data})).then((action)=>{
                if(action.payload){
                    handleClose()
                }
            })
        }
        if(page === PAGE.t){
            const todoId = activeItem._id
            dispatch(modifyTodoItemAsync({data, todoId, token})).then((action)=>{
                if(action.payload){
                    handleClose()
                }
            })
        }
    }

    const handleDelete = () =>{
        const itemId = activeItem._id
        if(page === PAGE.t){
        dispatch(deleteCategoryItemAsync({categoryId:itemId, token})).then((action)=>{
            if(action.payload){
                handleClose()
            }
        })}

        if(page === PAGE.t){
            dispatch(deleteTodoItemAsync({todoId: itemId, token})).then((action)=>{
                if(action.payload){
                    handleClose()
                }
            })
        }
    }

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
							<Box display="flex" flexDirection="column" mx="3">
								<TextField
									id="edit"
									label="Outlined"
									variant="outlined"
									align="center"
                                    value={edit}
                                    onChange={(e)=>setEdit(e.target.value)}
								/>
								<Box display="flex" justifyContent="space-around" mt={2}>
									<Button
										className={classes.button}
										variant="contained"
										color="primary"
                                        onClick={handleEdit}
									>
										Confirm
									</Button>
									<Button
										className={classes.button}
										variant="contained"
										color="secondary"
										onClick={handleClose}
									>
										Cancel
									</Button>
								</Box>
							</Box>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);

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
										color="primary"
                                        onClick={handleDelete}
									>
										Confirm
									</Button>
									<Button
										className={classes.button}
										variant="contained"
										color="secondary"
										onClick={handleClose}
									>
										Cancel
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
