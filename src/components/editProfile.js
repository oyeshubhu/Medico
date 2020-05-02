import React, { useEffect } from 'react';
import { makeStyles, Grid, Typography, TextField, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../actions';
import { useHistory } from 'react-router-dom';
import NavBar from './navBar';
const useStyles = makeStyles((theme) => ({
    gridHome: {
        minHeight: '100vh',
        spacing: 0,
        backgroundColor: '#BBDEFB'
    },
    gridContent: {
        marginTop: '1vh',
        width: '100%',
        textAlign: 'center'
    },
    title: {
        fontFamily: 'Dancing Script,Sans Serif,cursive',
        fontSize: theme.spacing(3),
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(2.5),
        }
    },
    signUp: {
        fontFamily: 'Ubuntu',
        fontSize: theme.spacing(2.5),
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(2)
        }
    },
    name: {
        paddingLeft: '2vw',
        textAlign: 'start',
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
        backgroundColor: 'green',
        color: 'white',

    },
    loginGrid: {
        marginTop: '1vh',
        paddingBottom: '1vh',
        paddingRight: '2vw',
        '& .MuiButton-contained:hover': {
            backgroundColor: 'green'
        }
    },
    logInLink: {
        textDecoration: 'none',
        color: 'black'
    }
}));


const Validation = Yup.object().shape({
    firstName: Yup
        .string()
        .min(2, 'Name is too short!')
        .max(15, 'Name is too long!')
        .notRequired(),

    secondName: Yup
        .string()
        .min(2, 'Name is too short!')
        .max(15, 'Name is too long!')
        .notRequired(),

    lastName: Yup
        .string()
        .min(2, 'Name is too short!')
        .max(15, 'Name is too long!')
        .notRequired(),

    password: Yup
        .string()
        .min(6, 'Password too short')
        .max(20, 'Password too long')
        .notRequired(),
    age: Yup
        .number()
        .positive('Age must not be negative')
        .notRequired(),
    bloodGroup: Yup
        .string()
        .max(3, 'Blood group can\'t greater than 3')
        .notRequired(),
    weight: Yup
        .number()
        .positive('Weight must be a positive number')
        .notRequired(),
    bmi: Yup
        .number()
        .positive()
        .notRequired(),
    leftEye: Yup
        .number()
        .max(6)
        .positive()
        .notRequired(),
    rightEye: Yup
        .number()
        .max(6)
        .positive()
        .notRequired(),
    doctorName: Yup
        .string()
        .max(15, 'Name is too long!')
        .notRequired(),
    doctorEmail: Yup
        .string()
        .email()
        .notRequired(),
    doctorPhone: Yup
        .number()
        .notRequired(),
    specialist: Yup
        .string()
        .notRequired(),
    address: Yup
        .string()
        .max(100, 'Too long address')
        .notRequired(),
    lastVisit: Yup
        .date()
        .notRequired(),
    nextVisit: Yup
        .date()
        .notRequired(),

})


const EditProfile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const history = useHistory();
    useEffect(() => {
        if (!isSignedIn) {
            history.push('/')
        }
    }, [isSignedIn, history])
    if (!user) {
        return null;
    } else {
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
                        <Typography className={classes.title}>Medico</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.gridContent}>
                        <Typography className={classes.signUp}>Welcome {user.user.firstName ? user.user.firstName : null}!</Typography>
                    </Grid>

                    <Formik

                        initialValues={{
                            firstName: '',
                            secondName: '',
                            lastName: '',
                            password: '',
                            age: '',
                            bloodGroup: '',
                            weight: '',
                            leftEye: 1,
                            rightEye: 1,
                            bmi: 1,
                            doctorName: '',
                            doctorPhone: 0,
                            doctorEmail: '',
                            address: '',
                            specialist: '',
                            lastVisit: new Date(),
                            nextVisit: new Date(),
                        }}
                        validationSchema={Validation}
                        onSubmit={(values) => {
                            dispatch(updateUser(values))
                        }}
                    >
                        {({ errors, handleChange, touched }) =>
                            <Form style={{ width: '100%' }}>
                                <Grid container direction='row'>
                                    <Grid item xs={12} className={classes.name}>
                                        <Typography className={classes.signUp}>Name</Typography>
                                    </Grid>
                                    <Grid item md={4} xs={12} className={classes.inputGrid}>
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.firstName && touched.firstName}
                                            name='firstName'
                                            autoComplete='on'
                                            shrink='true'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='firstName'
                                            label='First Name'
                                            helperText={
                                                errors.firstName && touched.firstName
                                                    ? errors.firstName : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} className={classes.inputGrid}>
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.secondName && touched.secondName}
                                            name='secondName'
                                            autoComplete='on'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='secondName'
                                            label='Middle Name'
                                            helperText={
                                                errors.secondName && touched.secondName
                                                    ? errors.secondName : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} className={classes.inputGrid}>
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.lastName && touched.lastName}
                                            name='lastName'
                                            autoComplete='on'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='lastName'
                                            label='Last Name'
                                            helperText={
                                                errors.lastName && touched.lastName
                                                    ? errors.lastName : null
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12} className={classes.name}>
                                        <Typography className={classes.signUp}>Password</Typography>
                                    </Grid>
                                    <Grid item md={6} xs={12} className={classes.inputGrid}>
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.password && touched.password}
                                            name='password'
                                            type='password'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='password'
                                            label='Password'
                                            helperText={
                                                errors.password && touched.password
                                                    ? errors.password : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={classes.name}>
                                        <Typography className={classes.signUp}>Personal Information</Typography>
                                    </Grid>
                                    <Grid item md={2} xs={6} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.age && touched.age}
                                            name='age'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='age'
                                            label='Age'
                                            helperText={
                                                errors.age && touched.age
                                                    ? errors.age : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={2} xs={6} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.bloodGroup && touched.bloodGroup}
                                            name='bloodGroup'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='bloodGroup'
                                            label='Blood Group'
                                            helperText={
                                                errors.bloodGroup && touched.bloodGroup
                                                    ? errors.bloodGroup : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={2} xs={6} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.weight && touched.weight}
                                            name='weight'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='weight'
                                            label='Weight(in Kg)'
                                            helperText={
                                                errors.weight && touched.weight
                                                    ? errors.weight : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={2} xs={6} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.bmi && touched.bmi}
                                            name='bmi'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='bmi'
                                            label='BMI'
                                            helperText={
                                                errors.bmi && touched.bmi
                                                    ? errors.bmi : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={2} xs={6} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.leftEye && touched.leftEye}
                                            name='leftEye'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='leftEye'
                                            label='Left Eye'
                                            helperText={
                                                errors.leftEye && touched.leftEye
                                                    ? errors.leftEye : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={2} xs={6} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.rightEye && touched.rightEye}
                                            name='rightEye'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='rightEye'
                                            label='Right Eye'
                                            helperText={
                                                errors.rightEye && touched.rightEye
                                                    ? errors.rightEye : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={classes.name}>
                                        <Typography className={classes.signUp}>Doctor's Information</Typography>
                                    </Grid>
                                    <Grid item md={3} xs={6} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.doctorName && touched.doctorName}
                                            name='doctorName'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='doctorName'
                                            label='Doctor&apos;s Name'
                                            helperText={
                                                errors.doctorName && touched.doctorName
                                                    ? errors.doctorName : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={6} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.doctorEmail && touched.doctorEmail}
                                            name='doctorEmail'
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
                                    <Grid item md={3} xs={6} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.doctorPhone && touched.doctorPhone}
                                            name='doctorPhone'
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
                                    <Grid item md={3} xs={6} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.specialist && touched.specialist}
                                            name='specialist'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='specialist'
                                            label='Specialization'
                                            helperText={
                                                errors.specialist && touched.specialist
                                                    ? errors.specialist : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.address && touched.address}
                                            name='address'
                                            variant='standard'
                                            onChange={handleChange}
                                            id='address'
                                            label='Address'
                                            helperText={
                                                errors.address && touched.address
                                                    ? errors.address : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={6} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.lastVisit && touched.lastVisit}
                                            name='lastVisit'
                                            variant='standard'
                                            type='datetime-local'
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
                                    <Grid item md={4} xs={6} className={classes.inputGrid} >
                                        <TextField
                                            className={classes.inputFields}
                                            error={errors.nextVisit && touched.nextVisit}
                                            name='nextVisit'
                                            variant='standard'
                                            type='datetime-local'
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
                                    <Grid item xs={6} container justify='center' alignItems='center' className={classes.loginGrid}>
                                        <Button
                                            className={classes.button}
                                            type='submit'
                                            variant='contained'
                                        >Submit</Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        }
                    </Formik>
                </Grid>
            </React.Fragment >
        );
    }


}

export default EditProfile;