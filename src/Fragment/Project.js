import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {getProjects, addProject, getProject, updateProject, deleteProject} from '../Components/Actions/ProjectData';
import ProjectDialog from './ProjectDialog';

const Projectview = () => {
    const classes  = useStyles();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [index, setIndex] = useState('');
    const [projectname, setProjectName] = useState('');
    const [special, setSpecial] = useState('');
    const [status, setStatus] =  useState('');
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
    const handleProjectName = (event) => {
        setProjectName(event.target.value);
    }
    const handleSpecial = (event) => {
        setSpecial(event.target.value);
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
            const list = await getProjects();
            setProjects(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOneProject = async (id) => {
            try {
                setFormMode(false);
                setCustId(id);
                const response = await getProject(id);
                 setIndex(response.index);
                 setProjectName(response.projectname);
                 setSpecial(response.special);
                 setStatus(response.status);
                 setDate(response.date);
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deleteProject(id);
                getlist();
                toast.success('Project Deleted Successfully');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setIndex('');
            setProjectName('');
            setSpecial('');
            setStatus('');
            setDate('');
    }

    const addProjectHandler = async () => {
            try {
                 const project = {
                     index,
                     projectname,
                     special,
                     status,
                     date,
                     
                 }
                if (formMode) {
                    await addProject(project);
                    toast.success('Project Added Successfully');
                    getlist();
                    setOpen(false);
                    setIndex('');
                    setProjectName('');
                    setSpecial('');
                    setStatus('');
                    setDate('');
                }else {
                    await updateProject(custId, project);
                    toast.success('Project Updated Successfully');
                    getlist();
                    setOpen(false);
                    setIndex('');
                    setProjectName('');
                    setSpecial('');
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
                       Projects
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
                            <TableCell className={classes.head}>Project Name</TableCell>
                            <TableCell className={classes.head}>Special Instruction</TableCell>
                            <TableCell className={classes.head}>Status</TableCell>
                            <TableCell className={classes.head}>Date Create</TableCell>
                            <TableCell className={classes.head}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.length === 0 ? (
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
                            {projects.map((cust) => (
                                <TableRow key={cust.id}>
                                  <TableCell>{cust.index}</TableCell>
                                  <TableCell>{cust.projectname}</TableCell>
                                  <TableCell>{cust.special}</TableCell>
                                  <TableCell>{cust.status}</TableCell>
                                  <TableCell>{cust.date}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => getOneProject(cust.id)} color="primary" aria-label="update Projects">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="delete Projects">
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
            <ProjectDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                index={index}
                projectname={projectname}
                special={special}
                status={status}
                date={date}
                changeIndex={handleIndex}
                changeProjectname={handleProjectName}
                changeSpecial={handleSpecial}
                changeStatus={handleStatus}
                changeDate={handleDate}
                addProject={addProjectHandler}
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

export default Projectview;