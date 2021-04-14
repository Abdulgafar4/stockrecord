import React from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, Button,
    Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const ProjectDialog = (props) => {
    return (
        <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ?  'Add New' : 'Update'}  Project</DialogTitle>
            <ValidatorForm
                onSubmit={props.addProject}
            >
                <DialogContent>
                    <Grid container spacing={3}>
                    <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Index"
                            onChange={props.changeIndex}
                            name="index"
                            value={props.index}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Project Name"
                            onChange={props.changeProjectname}
                            name="projectname"
                            value={props.projectname}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Special"
                                onChange={props.changeSpecial}
                                name="special"
                                value={props.special}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
                        <TextValidator
                            id="date"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Date"
                            onChange={props.changeDate}
                            // name="date"
                            type="date"
                            value={props.date}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                            InputLabelProps={{
                                shrink: true
                              }}
                        />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Status</FormLabel>
                                <RadioGroup aria-label="status" name="status" value={props.status} onChange={props.changeStatus}>
                                    <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
                                    <FormControlLabel value="In Progress" control={<Radio />} label="In Progress" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="secondary">
                       {props.formmode ? 'Add' : 'Update'}
                    </Button>
                    <Button onClick={props.close} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

export default ProjectDialog;