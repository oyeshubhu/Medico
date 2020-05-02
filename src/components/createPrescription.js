import React, { useEffect } from 'react';
import { makeStyles, Grid, Typography, TextField, Button } from '@material-ui/core';
import { Formik, Form, } from 'formik';
// import FileUploader from './fileUploader'
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from './navBar';
import { useDispatch } from 'react-redux';
import { postPrescription } from '../actions';

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

// const SUPPORTED_FORMATS = [
//     'image/jpg',
//     'image/jpeg',
//     'image/gif',
//     'image/png'
// ];

const Validation = Yup.object().shape({
    doctorName: Yup
        .string()
        .min(2, 'Name is too short!')
        .max(15, 'Name is too long!')
        .required('This field is required'),

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

    tests: Yup
        .string()
        .max(100)
        .notRequired(),

    precautions: Yup
        .string()
        .max(100)
        .notRequired(),

    medicine: Yup
        .string()
        .max(100)
        .notRequired(),

    date: Yup
        .date()
        .required('This field is required'),

    nextVisit: Yup
        .date()
        .notRequired(),

    // file: Yup
    //     .mixed()
    //     .required('A file is required')
    //     .test(
    //         'fileFormat',
    //         'Unsupported Format',
    //         value => value && SUPPORTED_FORMATS.includes(value.type)
    //     )

})


const CreatePrescription = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const user = useSelector(state => state.auth.user);
    useEffect(() => {
        if (!isSignedIn || !user) {
            history.push('/')
        }
    });
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
                    <Typography className={classes.signUp}>Welcome {user.user.firstName}!</Typography>
                    <Typography className={classes.slogan}>Create a new Prescription Here</Typography>
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
                        tests: '',
                        precautions: '',
                        medicine: '',
                        date: new Date(),
                        nextVisit: new Date(),
                        file: ''
                    }}
                    validationSchema={Validation}
                    onSubmit={(values) => {
                        dispatch(postPrescription(values));
                        console.log(values)
                    }}
                >
                    {({ errors, handleChange, touched, setFieldValue, handleBlur }) =>
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

                                <Grid item md={6} xs={12} className={classes.inputGrid}>
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.tests && touched.tests}
                                        name='tests'
                                        autoComplete='on'
                                        shrink='true'
                                        variant='standard'
                                        onChange={handleChange}
                                        id='tests'
                                        label='Tests'
                                        helperText={
                                            errors.tests && touched.tests
                                                ? errors.tests : null
                                        }
                                    />
                                </Grid>

                                <Grid item md={6} xs={12} className={classes.inputGrid}>
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.precautions && touched.precautions}
                                        name='precautions'
                                        autoComplete='on'
                                        shrink='true'
                                        variant='standard'
                                        onChange={handleChange}
                                        id='precautions'
                                        label='Precautions'
                                        helperText={
                                            errors.precautions && touched.precautions
                                                ? errors.precautions : null
                                        }
                                    />
                                </Grid>

                                <Grid item md={6} xs={12} className={classes.inputGrid}>
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.medicine && touched.medicine}
                                        name='medicine'
                                        autoComplete='on'
                                        shrink='true'
                                        variant='standard'
                                        onChange={handleChange}
                                        id='medicine'
                                        label='Medicine'
                                        helperText={
                                            errors.medicine && touched.medicine
                                                ? errors.medicine : null
                                        }
                                    />
                                </Grid>

                                <Grid item md={6} xs={6} className={classes.inputGrid} >
                                    <TextField
                                        className={classes.inputFields}
                                        error={errors.date && touched.date}
                                        name='date'
                                        variant='standard'
                                        type='date'
                                        onChange={handleChange}
                                        id='date'
                                        label='Date'
                                        helperText={
                                            errors.date && touched.date
                                                ? errors.date : null
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
                                {/* <Grid item md={6} container justify='center' alignItems='center' xs={6} className={classes.inputGrid} >
                                    <Field
                                        name='file'
                                        component={FileUploader}
                                        title="Upload"
                                        setFieldValue={setFieldValue}
                                        errorMessage={errors.marker_video ? errors.marker_video : ""}
                                        touched={touched.marker_video}
                                        onBlur={handleBlur}
                                    />
                                </Grid> */}

                                <Grid item xs={6} container justify='center' alignItems='center' className={classes.loginGrid} >
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

export default CreatePrescription;