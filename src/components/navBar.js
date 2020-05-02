import React from 'react';
import { makeStyles, Grid, AppBar, Toolbar, Typography, Hidden, Menu, MenuItem, Button } from '@material-ui/core';
import { image } from 'faker';
import { useDispatch } from 'react-redux';
import { signOut } from '../actions';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: '#9175FF',
    },
    menuGrid: {
        textAlign: 'end',
        height: '100%'
    },
    title: {
        fontFamily: 'Dancing Script,Sans Serif,cursive',
        fontWeight: 'bold',
        fontSize: theme.spacing(4),
        [theme.breakpoints.only('xs')]: {
            fontSize: theme.spacing(2.5),
        }
    },
    profileLink: {
        fontFamily: 'Ubuntu',
        textDecoration: 'none',
        color: 'white',
        fontWeight: 'bold',
        fontSize: theme.spacing(3),
        [theme.breakpoints.only('xs')]: {
            fontSize: theme.spacing(1.5),
        }

    },
    menuItems: {
        fontFamily: 'Ubuntu',
        fontSize: theme.spacing(1.5),
        fontWeight: '600',
    },
    profilePic: {
        borderRadius: '50%',
        width: 35,
        height: 35
    },
    icon: {
        position: 'relative',
        fontSize: theme.spacing(4.5),
        color: 'white',
        [theme.breakpoints.only('xs')]: {
            fontSize: theme.spacing(3.5),
        }
    },
    links: {
        color: 'black',
        textDecoration: 'none'
    },
    home: {
        color: 'white',
        textDecoration: 'none'
    },
    logOutButton: {
        textTransform: 'none',
        textDecoration: 'none',
        color: 'black',
        fontFamily: 'Ubuntu',
        fontWeight: 'bold',
    }
}))


const NavBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open = Boolean(anchorEl2);
    const handleClick2 = event => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    return (
        <React.Fragment>
            <AppBar position='relative' className={classes.appBar}>
                <Toolbar >
                    <Grid container direction='row' justify='center' alignItems='center' className={classes.gridHome} >
                        <Grid item xs={6} className={classes.titleGrid}>
                            <Typography className={classes.title}>
                                <Link to='/dashboard' className={classes.home}>M&nbsp;e&nbsp;d&nbsp;i&nbsp;c&nbsp;o</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.menuGrid}>
                            <Hidden only='xs'><img src={image.avatar()} alt='profile' aria-controls='profile' onClick={handleClick} aria-haspopup='true' className={classes.profilePic} /></Hidden>
                            <MoreVertIcon className={classes.icon}
                                aria-label='Menu'
                                aria-controls='options'
                                aria-haspopup='true'
                                onClick={handleClick2} />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Menu
                id='profile'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} className={classes.menuItems}>
                    <Link to='/profile' className={classes.links}>View Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleClose} className={classes.menuItems}>
                    <Button className={classes.logOutButton} onClick={() => { dispatch(signOut()) }}>Logout</Button>
                </MenuItem>
            </Menu>
            <Menu
                id='options'
                anchorEl={anchorEl2}
                keepMounted
                open={open}
                onClose={handleClose2}
            >
                <MenuItem onClick={handleClose2} className={classes.menuItems}>
                    <Link to='/dashboard' className={classes.links}>View Prescriptions</Link>
                </MenuItem>
                <MenuItem onClick={handleClose2} className={classes.menuItems}>
                    <Link to='/createPrescription' className={classes.links}>Create Prescriptions</Link>
                </MenuItem>
                <hr />
                <MenuItem onClick={handleClose2} className={classes.menuItems}>
                    <Link to='/viewAppointment' className={classes.links}>View Appointments</Link>
                </MenuItem>
                <MenuItem onClick={handleClose2} className={classes.menuItems}>
                    <Link to='/createAppointment' className={classes.links}>Create Appointments</Link>
                </MenuItem>

                <Hidden smUp>
                    <hr />
                    <MenuItem onClick={handleClose} className={classes.menuItems}>
                        <Link to='/profile' className={classes.links}>View Profile</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.menuItems}>
                        <Button className={classes.logOutButton} onClick={() => { dispatch(signOut()) }}>Logout</Button>
                    </MenuItem>
                </Hidden>
            </Menu>
        </React.Fragment>
    )
}

export default NavBar;