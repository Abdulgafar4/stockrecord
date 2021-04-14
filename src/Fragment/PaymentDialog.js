import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button,
    Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';




const PaymentDialog = (props) => {
 


    return (
        <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ?  'Add New' : 'Update'}  Payment</DialogTitle>
            <ValidatorForm
                onSubmit={props.addPayment}
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
                            label=" Name"
                            onChange={props.changeName}
                            name="name"
                            value={props.name}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Status</FormLabel>
                                <RadioGroup aria-label="status" name="status" value={props.status} onChange={props.changeStatus}>
                                    <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
                                    <FormControlLabel value="Unpaid" control={<Radio />} label="Unpaid" />
                                </RadioGroup>
                            </FormControl>
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

export default PaymentDialog;