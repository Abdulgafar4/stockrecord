import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid } from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';




const StockDialog = (props) => {
 


    return (
        <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ?  'Add New' : 'Update'}  Stock</DialogTitle>
            <ValidatorForm
                onSubmit={props.addStock}
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
                            label="Product Name"
                            onChange={props.changeProductname}
                            name="productname"
                            value={props.productname}
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
                            label="Product Code"
                            onChange={props.changeProductcode}
                            name="productcode"
                            value={props.productcode}
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
                            label="Categories"
                            onChange={props.changeCategories}
                            name="categories"
                            value={props.categories}
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
                            label="Stock"
                            onChange={props.changeInstock}
                            name="stock"
                            value={props.instock}
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
                            label="Price"
                            onChange={props.changePrice}
                            name="price"
                            value={props.price}
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

export default StockDialog;