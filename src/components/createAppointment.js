import React, { useEffect } from 'react';
import { makeStyles, Grid, Typography, TextField, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from './navBar';
import { postAppointment } from '../actions';

const useStyles = makeStyles((theme) => ({
    gridHome: {
        minHeight: '100vh',
        spacing: 0,
        backgroundColor: '#F2BBA7'
    },
    gridContent: {
        marginTop: '1vh',
        width: '100%',
        textAlign: 'center'
    },
    signUp: {
        fontFamily: 'Ubuntu',
        fontSize: theme.spacing(2.5),
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(2)
        }
    },
    slogan: {
        fontFamily: 'Ubuntu',
        fontSize: theme.spacing(1.5),
        fontWeight: '600',
    },
    slogan2: {
        fontFamily: 'Ubuntu',
        color: 'red',
        fontSize: theme.spacing(2),
        fontWeight: '600',
    },
    inputGrid: {
        textAlign: 'start',
        padding: '1vh 3vw 1vh 2vw'
    },
    inputFields: {
        width: '100%',
        '& .MuiInputLabel-animated': {
            color: 'black',
            [theme.breakpoints.down('md')]: {
                fontSize: theme.spacing(2),
            }
        },
    },
    accountLogIn: {
        fontFamily: 'Ubuntu',
        fontWeight: '500',
        fontSize: theme.spacing(2.5),
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(1.5),
        }
    },
    button: {
        textTransform: 'none',
        fontFamily: 'Ubuntu',
        borderRadius: '2.5em ',
        backgroundColor: 'blue',
        color: 'white',

    },
    loginGrid: {
        marginTop: '1vh',
        paddingBottom: '1vh',
        paddingRight: '2vw',
        '& .MuiButton-contained:hover': {
            backgroundColor: 'blue'
        }
    }
}));

const Validation = Yup.object().shape({
    doctorName: Yup
        .string()
        .min(2, 'Name is too short!')
        .max(15, 'Name is too long!')
        .required('This field is required')
        .default('hi'),

    doctorEmail: Yup
        .string()
        .email()
        .notRequired(),

    doctorPhone: Yup
        .number()
        .notRequired(),

    hostpitalClinicName: Yup
        .string()
        .min(10, 'Hospital Name is too short!')
        .max(100, 'Hospital Name is too long!')
        .required('This field is required'),

    address: Yup
        .string()
        .max(100, 'Too long address')
        .notRequired(),

    city: Yup
        .string()
        .required('This field is required'),

    ailment: Yup
        .string()
        .required('This field is required'),

    lastVisit: Yup
        .date()
        .notRequired(),

    nextVisit: Yup
        .date()
        .required(),

})


const CreateAppointment = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    console.log(isSignedIn);
    useEffect(() => {
        if (!isSignedIn) {
            history.push('/')
        }
    }, [isSignedIn, history])
    return (
        <React.Fragment>
            <NavBar />
            <Grid
                container
                direction='column'
                justify='flex-start'
                alignItems='flex-start'
                className={classes.gridHome}
            >
                <Grid item xs={12} className={classes.gridContent}>
                    <Typography className={classes.signUp}>Welcome User!</Typography>
                    <Typography className={classes.slogan}>Create a new Appointment Here</Typography>
                </Grid>

                <Formik

                    initialValues={{
                        doctorName: '',
                        doctorEmail: '',
                        doctorPhone: '',
                        hostpitalClinicName: '',
                        address: '',
                        city: '',
                        ailment: '',
                        lastVisit: new Date(),
                        nextVisit: new Date(),
                    }}
                    validationSchema={Validation}
                    onSubmit={(values) => { dispatch(postAppointment(values)); }}
                >
                    {({ errors, handleChange, touched }) =>
                        <Form style={{ width: '100%' }}>
                            <Grid container direction='row'>
                                <Grid item md={6} xs={12} className={classes.inputGrid}>
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.doctorName && touched.doctorName}
                                        name='doctorName'
                                        autoComplete='on'
                                        shrink='true'
                                        variant='standard'
                                        onChange={handleChange}
                                        id='doctorName'
                                        label='Doctor&apos; Name'
                                        helperText={
                                            errors.doctorName && touched.doctorName
                                                ? errors.doctorName : null
                                        }
                                    />
                                </Grid>

                                <Grid item md={6} xs={12} className={classes.inputGrid}>
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.doctorEmail && touched.doctorEmail}
                                        name='doctorEmail'
                                        autoComplete='on'
                                        variant='standard'
                                        onChange={handleChange}
                                        id='doctorEmail'
                                        label='Doctor&apos;s Email'
                                        helperText={
                                            errors.doctorEmail && touched.doctorEmail
                                                ? errors.doctorEmail : null
                                        }
                                    />
                                </Grid>

                                <Grid item md={6} xs={12} className={classes.inputGrid}>
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.doctorPhone && touched.doctorPhone}
                                        name='doctorPhone'
                                        autoComplete='on'
                                        variant='standard'
                                        onChange={handleChange}
                                        id='doctorPhone'
                                        label='Doctor&apos;s Phone'
                                        helperText={
                                            errors.doctorPhone && touched.doctorPhone
                                                ? errors.doctorPhone : null
                                        }
                                    />
                                </Grid>

                                <Grid item md={6} xs={12} className={classes.inputGrid}>
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.hostpitalClinicName && touched.hostpitalClinicName}
                                        name='hostpitalClinicName'
                                        autoComplete='on'
                                        shrink='true'
                                        variant='standard'
                                        onChange={handleChange}
                                        id='hostpitalClinicName'
                                        label='Hospital/Clinic'
                                        helperText={
                                            errors.hostpitalClinicName && touched.hostpitalClinicName
                                                ? errors.hostpitalClinicName : null
                                        }
                                    />
                                </Grid>

                                <Grid item md={6} xs={12} className={classes.inputGrid}>
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.address && touched.address}
                                        name='address'
                                        autoComplete='on'
                                        shrink='true'
                                        variant='standard'
                                        onChange={handleChange}
                                        id='address'
                                        label='Hospital/Clinic Address'
                                        helperText={
                                            errors.address && touched.address
                                                ? errors.address : null
                                        }
                                    />
                                </Grid>

                                <Grid item md={6} xs={12} className={classes.inputGrid}>
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.city && touched.city}
                                        name='city'
                                        autoComplete='on'
                                        shrink='true'
                                        variant='standard'
                                        onChange={handleChange}
                                        id='city'
                                        label='City'
                                        helperText={
                                            errors.city && touched.city
                                                ? errors.city : null
                                        }
                                    />
                                </Grid>

                                <Grid item md={6} xs={12} className={classes.inputGrid}>
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.ailment && touched.ailment}
                                        name='ailment'
                                        autoComplete='on'
                                        shrink='true'
                                        variant='standard'
                                        onChange={handleChange}
                                        id='ailment'
                                        label='Ailment'
                                        helperText={
                                            errors.ailment && touched.ailment
                                                ? errors.ailment : null
                                        }
                                    />
                                </Grid>

                                <Grid item md={6} xs={6} className={classes.inputGrid} >
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.lastVisit && touched.lastVisit}
                                        name='lastVisit'
                                        variant='standard'
                                        type='date'
                                        onChange={handleChange}
                                        id='lastVisit'
                                        label='Last Visit'
                                        helperText={
                                            errors.lastVisit && touched.lastVisit
                                                ? errors.lastVisit : null
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>

                                <Grid item md={6} xs={6} className={classes.inputGrid} >
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.nextVisit && touched.nextVisit}
                                        name='nextVisit'
                                        variant='standard'
                                        type='date'
                                        onChange={handleChange}
                                        id='nextVisit'
                                        label='Next Visit'
                                        helperText={
                                            errors.nextVisit && touched.nextVisit
                                                ? errors.nextVisit : null
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>

                                <Grid item xs={12} container justify='center' alignItems='center' className={classes.loginGrid} >
                                    <Button
                                        className={classes.button}
                                        type='submit'
                                        variant='contained'

                                    >Create Now</Button>
                                </Grid>
                                <Grid item xs={12} container justify='center' alignItems='center' className={classes.loginGrid} >
                                    <Typography className={classes.slogan2}>{null}</Typography>
                                </Grid>
                            </Grid>

                        </Form>
                    }
                </Formik>
            </Grid>
        </React.Fragment >
    );
}

export default CreateAppointment;