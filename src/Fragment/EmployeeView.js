import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {getEmployees, addEmployee, getEmployee, updateEmployee, deleteEmployee} from '../Components/Actions/EmployeeData';
import EmployeeDialog from './EmployeeDialog';

const Employeeview = () => {
    const classes  = useStyles();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phonenumber, setPhoneNumber] =  useState('');
    const [gender, setGender] = useState('Female');
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const override =`
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
    const handleClose = () => {
        setOpen(false);
    }
    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastName = (event) => {
        setLastName(event.target.value);
    }
    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handleGender = (event) => {
        setGender(event.target.value);
    }
    const handleCity = (event) => {
        setCity(event.target.value);
    }    
    const handleDate = (event) => {
        setDate(event.target.value);
    }
    const getlist = async () => { 
        try {
            setLoading(true);
            const list = await getEmployees();
            setEmployees(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOneEmployee = async (id) => {
            try {
                setFormMode(false);
                setCustId(id);
                const response = await getEmployee(id);
                 setFirstName(response.firstname);
                 setLastName(response.lastname);
                 setPhoneNumber(response.phonenumber);
                 setGender(response.gender);
                 setCity(response.city);
                 setDate(response.date);
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deleteEmployee(id);
                getlist();
                toast.success('Employee Deleted Successfully');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setCity('');
            setDate('');
            setGender('Female'); 
    }

    const addEmployeeHandler = async () => {
            try {
                 const employee = {
                     firstname,
                     lastname,
                     phonenumber,
                     gender,
                     city,
                     date,
                     
                 }
                if (formMode) {
                    await addEmployee(employee);
                    toast.success('Employee Added Successfully');
                    getlist();
                    setOpen(false);
                    setFirstName('');
                    setLastName('');
                    setPhoneNumber('');
                    setCity('');
                    setDate('');
                    setGender('Female'); 
                }else {
                    await updateEmployee(custId, employee);
                    toast.success('Employee Updated Successfully');
                    getlist();
                    setOpen(false);
                    setFirstName('');
                    setLastName('');
                    setPhoneNumber('');
                    setCity('');
                    setDate('');
                    setGender('Female'); 
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
                        Employees
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
                            <TableCell className={classes.head}>Full Name</TableCell>
                            <TableCell className={classes.head}>Phone</TableCell>
                            <TableCell className={classes.head}>Gender</TableCell>
                            <TableCell className={classes.head}>City</TableCell>
                            <TableCell className={classes.head}>Date Created</TableCell>
                            <TableCell className={classes.head}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.length === 0 ? (
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
                            {employees.map((cust) => (
                                <TableRow key={cust.id}>
                                  <TableCell>{cust.firstname} {cust.lastname}</TableCell>
                                  <TableCell>{cust.phonenumber}</TableCell>
                                  <TableCell>{cust.gender}</TableCell>
                                  <TableCell>{cust.city}</TableCell>
                                  <TableCell>{cust.date}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => getOneEmployee(cust.id)} color="primary" aria-label="update employee">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="delete employees">
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
            <EmployeeDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                firstname={firstname}
                lastname={lastname}
                phonenumber={phonenumber}
                city={city}
                date={date}
                gender={gender}
                changeFirstname={handleFirstName}
                changeLastname={handleLastName}
                changephonenumber={handlePhoneNumber}
                changeCity={handleCity}
                changeDate={handleDate}
                changeGender={handleGender}
                addEmployee={addEmployeeHandler}
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

export default Employeeview;