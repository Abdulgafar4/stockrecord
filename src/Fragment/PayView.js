import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {getPayments, addPayment, getPayment, updatePayment, deletePayment} from '../Components/Actions/PaymentData';
import PaymentDialog from './PaymentDialog';

const PayView = () => {
    const classes  = useStyles();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [index, setIndex] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
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
    const handleStatus = (event) => {
        setStatus(event.target.value);
    }
    const handleDate = (event) => {
        setDate(event.target.value);
    }
    const getlist = async () => { 
        try {
            setLoading(true);
            const list = await getPayments();
            setPayments(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOnePayment = async (id) => {
            try {
                setFormMode(false);
                setCustId(id);
                const response = await getPayment(id);
                 setIndex(response.index);
                 setName(response.name);
                 setStatus(response.status);
                 setDate(response.date);
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deletePayment(id);
                getlist();
                toast.success('Payment Deleted Successfully');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setIndex('');
            setName('');
            setStatus('');
            setDate('');
    }

    const addPaymentHandler = async () => {
            try {
                 const payment = {
                     index,
                     name,
                     status,
                     date,
                     
                 }
                if (formMode) {
                    await addPayment(payment);
                    toast.success('Payment Added Successfully');
                    getlist();
                    setOpen(false);
                    setIndex('');
                    setName('');
                    setStatus('');
                    setDate('');
                }else {
                    await updatePayment(custId, payment);
                    toast.success('Payment Updated Successfully');
                    getlist();
                    setOpen(false);
                    setIndex('');
                    setName('');
                    setStatus('');
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
                         Waybills
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
                            <TableCell className={classes.head}>Employee Name</TableCell>
                            <TableCell className={classes.head}>Payment status</TableCell>
                            <TableCell className={classes.head}>Date Create</TableCell>
                            <TableCell className={classes.head}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.length === 0 ? (
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
                            {payments.map((cust) => (
                                <TableRow key={cust.id}>
                                  <TableCell>{cust.index}</TableCell>
                                  <TableCell>{cust.name}</TableCell>
                                  <TableCell>{cust.status}</TableCell>
                                  <TableCell>{cust.date}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => getOnePayment(cust.id)} color="primary" aria-label="update Payments">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="delete Payments">
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
            <PaymentDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                index={index}
                name={name}
                status={status}
                date={date}
                changeIndex={handleIndex}
                changeName={handleName}
                changeStatus={handleStatus}
                changeDate={handleDate}
                addPayment={addPaymentHandler}
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

export default PayView;