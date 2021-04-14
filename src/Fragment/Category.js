import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {getCategories, addCategory, getCategory, updateCategory, deleteCategory} from '../Components/Actions/CategoryData';
import CategoryDialog from './CategoryDialog';

const Category = () => {
    const classes  = useStyles();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [index, setIndex] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] =  useState('');
    const override =`
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
    const handleClose = () => {
        setOpen(false);
    }
    const handleIndex = (event) => {
        setIndex(event.target.value);
    }
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleDate = (event) => {
        setDate(event.target.value);
    }
    const getlist = async () => { 
        try {
            setLoading(true);
            const list = await getCategories();
            setCategories(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOneCategory = async (id) => {
            try {
                setFormMode(false);
                setCustId(id);
                const response = await getCategory(id);
                 setIndex(response.index);
                 setName(response.name);
                 setDate(response.date);
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deleteCategory(id);
                getlist();
                toast.success('Category Deleted Successfully');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setIndex('');
            setName('');
            setDate('');
    }

    const addCategoryHandler = async () => {
            try {
                 const category = {
                     index,
                     name,
                     date,
                     
                 }
                if (formMode) {
                    await addCategory(category);
                    toast.success('Category Added Successfully');
                    getlist();
                    setOpen(false);
                    setIndex('');
                    setName('');
                    setDate('');
                }else {
                    await updateCategory(custId, category);
                    toast.success('Category Updated Successfully');
                    getlist();
                    setOpen(false);
                    setIndex('');
                    setName('');
                    setDate('');
                }
            } catch (error) {
                toast.error(error.message);
            }
    }

    useEffect(() => {
        getlist();
    }, []);
    return (
        <Container className={classes.container}>
            <ToastContainer/>
            <TableContainer component={Paper}>
                <Grid container>
                    <Grid item xs={8}>
                    <Typography className={classes.title} variant="h6" component="div">
                        All Categories
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        className={classes.button}
                        startIcon={<AddCircle/>}
                    >Add</Button>
                    </Grid>
                </Grid>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Index</TableCell>
                            <TableCell className={classes.head}>Name</TableCell>
                            <TableCell className={classes.head}>Date Create</TableCell>
                            <TableCell className={classes.head}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <ScaleLoader 
                                     css={override}
                                    size={150}
                                    color={"#eb4034"}
                                    loading={loading}/>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                            {categories.map((cust) => (
                                <TableRow key={cust.id}>
                                  <TableCell>{cust.index}</TableCell>
                                  <TableCell>{cust.name}</TableCell>
                                  <TableCell>{cust.date}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => getOneCategory(cust.id)} color="primary" aria-label="update categories">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="delete categories">
                                        <Delete />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                            ))}
                              
                            </>
                        )}
                        
                    </TableBody>
                </Table>  
            </TableContainer>
            <CategoryDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                index={index}
                name={name}
                date={date}
                changeIndex={handleIndex}
                changeName={handleName}
                changeDate={handleDate}
                addCategory={addCategoryHandler}
            />
        </Container>
    );
}


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    container: {
        marginTop: '40px'
    }, 
    title: {
        flex: '1 1 100%',
        padding: '20px'
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    button: {
        margin: theme.spacing(1),
        float: 'right',
    },
}));

export default Category;