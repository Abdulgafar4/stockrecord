import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {getStocks, addStock, getStock, updateStock, deleteStock} from '../Components/Actions/StockData';
import StockDialog from './StockDialog';

const Stockview = () => {
    const classes  = useStyles();
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [index, setIndex] = useState('');
    const [productname, setProductName] = useState('');
    const [productcode, setProductCode] = useState('');
    const [categories, setCategories] =  useState('');
    const [instock, setInStock] =  useState('');
    const [price, setPrice] =  useState('');
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
    const handleProductName = (event) => {
        setProductName(event.target.value);
    }
    const handleProductCode = (event) => {
        setProductCode(event.target.value);
    }
    const handleCategories = (event) => {
        setCategories(event.target.value);
    }
    const handleInStock = (event) => {
        setInStock(event.target.value);
    }
    const handlePrice = (event) => {
        setPrice(event.target.value);
    }
    const handleDate = (event) => {
        setDate(event.target.value);
    }
    const getlist = async () => { 
        try {
            setLoading(true);
            const list = await getStocks();
            setStocks(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOneStock = async (id) => {
            try {
                setFormMode(false);
                setCustId(id);
                const response = await getStock(id);
                 setIndex(response.index);
                 setProductName(response.productname);
                 setProductCode(response.productcode);
                 setCategories(response.categories);
                 setInStock(response.instock);
                 setDate(response.date);
                 setPrice(response.price);
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deleteStock(id);
                getlist();
                toast.success('Stock Deleted Successfully');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setIndex('');
            setProductName('');
            setProductCode('');
            setCategories('');
            setInStock('');
            setPrice('');
            setDate('');
    }

    const addStockHandler = async () => {
            try {
                 const stock = {
                     index,
                     productname,
                     productcode,
                     categories,
                     instock,
                     price,
                     date,
                     
                 }
                if (formMode) {
                    await addStock(stock);
                    toast.success('Stock Added Successfully');
                    getlist();
                    setOpen(false);
                    setIndex('');
                    setProductName('');
                    setProductCode('');
                    setCategories('');
                    setInStock('');
                    setPrice('');
                    setDate('');
                }else {
                    await updateStock(custId, stock);
                    toast.success('Stock Updated Successfully');
                    getlist();
                    setOpen(false);
                    setIndex('');
                    setProductName('');
                    setProductCode('');
                    setCategories('');
                    setInStock('');
                    setPrice('');
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
                         Stocks
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
                            <TableCell className={classes.head}>Product Name</TableCell>
                            <TableCell className={classes.head}>Product Code</TableCell>
                            <TableCell className={classes.head}>Categories</TableCell>
                            <TableCell className={classes.head}>In Stock</TableCell>
                            <TableCell className={classes.head}>Price</TableCell>
                            <TableCell className={classes.head}>Date Create</TableCell>
                            <TableCell className={classes.head}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stocks.length === 0 ? (
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
                            {stocks.map((cust) => (
                                <TableRow key={cust.id}>
                                  <TableCell>{cust.index}</TableCell>
                                  <TableCell>{cust.productname}</TableCell>
                                  <TableCell>{cust.productcode}</TableCell>
                                  <TableCell>{cust.categories}</TableCell>
                                  <TableCell>{cust.instock}</TableCell>
                                  <TableCell>{cust.price}</TableCell>
                                  <TableCell>{cust.date}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => getOneStock(cust.id)} color="primary" aria-label="update stocks">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="delete stocks">
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
            <StockDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                index={index}
                productname={productname}
                productcode={productcode}
                categories={categories}
                instock={instock}
                price={price}
                date={date}
                changeIndex={handleIndex}
                changeProductname={handleProductName}
                changeProductcode={handleProductCode}
                changeCategories={handleCategories}
                changeInstock={handleInStock}
                changePrice={handlePrice}
                changeDate={handleDate}
                addStock={addStockHandler}
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

export default Stockview;