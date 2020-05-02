import React, { useEffect } from 'react';
import { makeStyles, Typography, Button, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NavBar from './navBar';
import moment from 'moment';
import Loader from '../Loader/square-animation'

import { deleteUser } from '../actions';
const useStyles = makeStyles((theme) => ({
    data: {
        color: 'black',
        fontFamily: 'Ubuntu'
    },
    dataGrid: {
        marginLeft: '2vw',
        textAlign: 'start',
        width: '100%',

    },
    buttonGrid: {
        '& .MuiButton-contained:hover': {
            backgroundColor: 'Red'
        },
        textAlign: 'center'
    },
    button: {
        textDecoration: 'none',
        textTransform: 'none',
        color: 'white',
        backgroundColor: 'red',
        fontFamily: 'Ubuntu',
        borderRadius: '1em',
        padding: '.5em'
    }
}));
const Profile = () => {
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const history = useHistory();
    const user = useSelector(state => state.auth.user);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isSignedIn) {
            history.push('/');
        }
    }, [isSignedIn, history])

    if (!user) {
        return (
            <div>
                <Loader />
            </div>
        );
    } else {
        return (
            <React.Fragment>
                <NavBar />
                <Grid container direction='row' justify='flex-start' alignItems='flex-start' style={{ minHeight: '100vh' }}>
                    <Grid item xs={12} md={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Name:{user.user.firstName} {user.user.secondName} {user.user.lastName}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Email:{user.user.email}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Phone:{user.user.phone}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Age:{user.user.age}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Blood Group:{user.user.bloodGroup}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Weight:{user.user.weight}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>BMI:{user.user.bmi}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Right Eye:{user.user.rightEye}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Left Eye:{user.user.leftEye}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Doctor's Name:{user.user.doctorName}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Doctor's Email:{user.user.doctorEmail}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Doctor's Phone:{user.user.doctorPhone}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Doctor's Specialization:{user.user.specialist}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Address:{user.user.address}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Last Visit:{moment(user.user.lastVisit).format('YYYY-MM-DD h:mm:ss a')}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <Typography className={classes.data}>Next Visit:{moment(user.user.nextVisit).format('YYYY-MM-DD h:mm:ss a')}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.buttonGrid}>
                        <Button
                            className={classes.button}
                            onClick={() => { dispatch(deleteUser()) }}
                        >
                            Delete Profile
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }

}

export default Profile;