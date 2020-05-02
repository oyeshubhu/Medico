import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Grid,
    Typography,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Button,
    Hidden
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAppointment, deleteAppointment } from '../actions';
import NavBar from './navBar';
import moment from 'moment';
import Loader from '../Loader/square-animation';

const useStyles = makeStyles(theme => ({
    gridHome: {
        minHeight: '100vh',
        backgroundColor: '#F2BBA7'
    },
    dashGrid: {
        textAlign: 'center',
        width: '100%'
    },
    heading: {
        fontWeight: 'bold',
        fontFamily: 'Ubuntu',
        fontSize: theme.spacing(3),
        [theme.breakpoints.only('xs')]: {
            fontSize: theme.spacing(2),
        }
    },
    serial: {
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Ubuntu',
        fontWeight: 'bold'
    },
    primaryHeading: {
        fontSize: theme.spacing(2),
        fontFamily: 'Ubuntu',
        fontWeight: 'bold',
        [theme.breakpoints.only('xs')]: {
            fontSize: theme.spacing(1.5),
        }
    },
    secondaryHeading: {
        fontSize: theme.spacing(2),
        fontFamily: 'Ubuntu',
        fontWeight: '550',
        fontStyle: 'italic',
        [theme.breakpoints.only('xs')]: {
            fontSize: theme.spacing(1.5),
        }
    },
    gridWidth: {
        width: '100%'
    },
    editButtonGrid: {
        textAlign: 'start',
        paddingLeft: '2vw',
        marginTop: '2vh',
        '& .MuiButton-contained:hover': {
            backgroundColor: 'none'
        }
    },
    deleteButtonGrid: {
        textAlign: 'end',
        paddingRight: '2vw',
        marginTop: '2vh',
        '& .MuiButton-contained:hover': {
            backgroundColor: 'none'
        }
    },
    editButton: {
        textTransform: 'none',
        backgroundColor: 'transparent',
        fontFamily: 'Roboto',
        color: 'black',
        fontWeight: 'bold',
        [theme.breakpoints.only('xs')]: {
            fontSize: theme.spacing(1.5)
        },
    },
    delButton: {
        textTransform: 'none',
        backgroundColor: 'transparent',
        fontFamily: 'Roboto',
        color: 'black',
        fontWeight: 'bold',
        [theme.breakpoints.only('xs')]: {
            fontSize: theme.spacing(1.5)
        }
    },
    expansionDescription: {
        fontFamily: 'Ubuntu',
        fontSize: theme.spacing(1.8),
        fontWeight: '500'
    },
    expansion: {
        boxShadow: '2.5px 5px 2.5px grey'
    }

}))
const ViewAppointment = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState('panel0');
    const dispatch = useDispatch();
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }
    const data = useSelector(state => state.data.appointments);
    const history = useHistory();
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    useEffect(() => {
        if (!isSignedIn) {
            history.push('/')
        }
        if (isSignedIn) {
            dispatch(getAppointment())
        }
    }, [isSignedIn, history, dispatch])

    if (!data) {
        return <Loader />
    }
    return (
        <React.Fragment>
            <NavBar />
            <Grid container direction='column' justify='flex-start' alignItems='center' className={classes.gridHome}>
                <Grid item xs={12} className={classes.dashGrid}>
                    <Typography className={classes.heading} gutterBottom >Y O U R  &nbsp;A P P O I N T M E N T S</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    {
                        data.map((value, i) => (
                            <ExpansionPanel key={i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)} className={classes.expansion} >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel1bh-content'
                                    id='panelBar-header'
                                >
                                    <Grid container justify='space-between'>
                                        <Hidden only={'xs'}>
                                            <Typography className={classes.serial}>{i + 1}</Typography>
                                        </Hidden>

                                        <Typography className={classes.primaryHeading}>{value.doctorName}</Typography>
                                        <Typography className={classes.secondaryHeading}>{value.ailment}</Typography>
                                        <Typography className={classes.secondaryHeading}>{moment(value.date).format('YYYY-MM-DD ')}</Typography>
                                        <Typography className={classes.secondaryHeading} style={{ marginRight: '2vw' }}>{value.city}</Typography>
                                    </Grid>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container direction='row' justify='center' alignItems='center'>
                                        <Grid item className={classes.gridWidth}>
                                            <Typography className={classes.expansionDescription}>Doctor's Contact:{value.doctorPhone}</Typography>
                                        </Grid>
                                        <Grid item className={classes.gridWidth}>
                                            <Typography className={classes.expansionDescription}>Hospital/Clinic:{value.hostpitalClinicName}</Typography>
                                        </Grid>
                                        <Grid item className={classes.gridWidth}>
                                            <Typography className={classes.expansionDescription}>Address:{value.address}</Typography>
                                        </Grid>

                                        <Grid item className={classes.gridWidth}>
                                            <Typography className={classes.expansionDescription}>Next Appointment:{moment(value.nextVisit).format('YYYY-MM-DD ')}</Typography>
                                        </Grid>
                                        <Grid item xs={6} className={classes.editButtonGrid}>
                                            <Button
                                                className={classes.editButton}
                                            ><EditIcon /></Button>
                                        </Grid>
                                        <Grid item xs={6} className={classes.deleteButtonGrid}>
                                            {<Button
                                                className={classes.delButton}
                                                onClick={() => { dispatch(deleteAppointment(value._id)) }}
                                            ><DeleteIcon /></Button>}

                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))
                    }
                </Grid>
            </Grid>
        </React.Fragment >
    );
}

export default ViewAppointment;