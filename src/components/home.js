import React from 'react';
import { Grid, makeStyles, Hidden, Typography, Paper, TextField, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../actions';

const images = [
    'https://wallpaperplay.com/walls/full/0/1/9/13968.jpg',
    'https://wallpaperplay.com/walls/full/e/7/f/13977.jpg',
    'https://cdn.pixabay.com/photo/2016/11/30/12/17/cells-1872666_960_720.jpg',
    'https://cdn.pixabay.com/photo/2020/03/30/09/15/corona-4983590_960_720.jpg'

]

let number = Math.floor(Math.random() * 3);
let color = '';
if (number === 1) {
    color = 'black'
} else {
    color = 'white'
}



const useStyles = makeStyles(theme => ({
    gridHome: {
        minHeight: '100vh',
        backgroundImage: `url(${images[number]})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    gridTitle: {
        textAlign: 'center',
    },
    title: {
        fontSize: theme.spacing(4.5),
        color: color,
        fontFamily: 'Dancing Script,Sans Serif,cursive',
        [theme.breakpoints.down('md')]: {
            fontSize: theme.spacing(6),
        }
    },
    loginTitle: {
        color: color,
        fontSize: theme.spacing(2.5),
        [theme.breakpoints.down('md')]: {
            fontSize: theme.spacing(3.5),
        }
    },
    slogan: {
        color: color,
        fontSize: theme.spacing(2.5),
        [theme.breakpoints.down('md')]: {
            fontSize: theme.spacing(3.5),
        }
    },
    icon: {
        color: 'red',
        fontSize: theme.spacing(2),
    },
    link: {
        textDecoration: 'none',
        color: color,
    },
    link2: {
        textDecoration: 'none',
        color: 'black',
    },
    loginGrid: {
        minHeight: '50vh',
        [theme.breakpoints.down('xs')]: {
            height: '100vh',
            width: '100vw'
        }
    },
    loginPaper: {
        width: '40vw',
        minHheight: '40vh',
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            height: '100vh'
        }
    },
    header: {
        textAlign: 'center',
    },
    medico: {
        fontFamily: 'Dancing Script,Sans Serif,cursive',
        fontSize: theme.spacing(3),
        fontWeight: 'bold',
        padding: '1vh'
    },
    signIn: {
        fontSize: theme.spacing(4),
        fontWeight: 'bold',
        color: '#323232',
        padding: '1vh 3vw 1vh 3vw',
        fontStyle: 'normal',
        fontFamily: 'Ubuntu',
        marginTop: '4vh',
        [theme.breakpoints.down('xs')]: {
            padding: '1vh 3vw 1vh 3vw',
            marginTop: '2vh',
        }
    },
    createAccount: {
        fontSize: theme.spacing(2),
        fontWeight: '300',
        color: '#323232',
        padding: '1vh 3vw 1vh 3vw',
        fontStyle: 'normal',
        fontFamily: 'Ubuntu',
        [theme.breakpoints.down('xs')]: {
            padding: '1vh 3vw 1vh 3vw',
        }
    },
    inputField: {
        width: '30vw',
        padding: '1vh 2vw 1vh 3vw',
        '& .MuiInputLabel-animated': {
            color: 'black',
            padding: '1vh 2vw 1vh 3vw',
            [theme.breakpoints.down('xs')]: {
                fontSize: theme.spacing(1.5),
                padding: '1vh 2vw 1vh 3vw',
            }
        },
        '& .MuiInputBase-input:focus': {
            color: 'black'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '12px',
            width: '90vw'
        }
    },
    buttonContainer: {
        padding: '1vh 3vw 1vh 8vw',
        textAlign: 'end'
    },
    button: {
        textTransform: 'none',
        borderRadius: '2.5em'
    },
    orLogin: {
        textAlign: 'center',
        marginBotton: '3vh'
    },
    or: {
        fontWeight: 'bold',
        fontFamily: 'Ubuntu',
        fontSize: theme.spacing(2.5)
    },
    socialGrid: {
        marignTop: '2vh',
        textAlign: 'center',
        padding: '1vh 3vw 1vh 3vw',
    },
    facebook: {
        backgroundColor: '#3B5998',
        color: 'white',
        borderRadius: '2.5em',
        textTransform: 'none',
        fontStyle: 'normal',
        fontFamily: 'Ubuntu',
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(1.5)
        }
    },
    insta: {
        backgroundColor: '#E1306C',
        color: 'white',
        borderRadius: '2.5em',
        textTransform: 'none',
        fontStyle: 'normal',
        fontFamily: 'Ubuntu',
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(1.5)
        }
    },
    signUpLink: {
        textDecoration: 'none',
        fontFamily: 'Ubuntu',
        color: 'black',
    },
    google: {
        backgroundColor: '#DB4437',
        color: 'white',
        borderRadius: '2.5em',
        textTransform: 'none',
        fontStyle: 'normal',
        fontFamily: 'Ubuntu',
        marginBottom: '4vh',
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(1.5),
            marginBottom: '2vh',
        }
    },
    socialTypo: {
        paddingLeft: theme.spacing(2)
    }

}

));

const Validation = Yup.object().shape({
    email: Yup
        .string()
        .email()
        .required('This field is required'),
    password: Yup
        .string()
        .min(6, 'Password too short')
        .max(20, 'Password too long')
        .required('This field is required')
})

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <Grid container direction='row' justify='center' alignItems='center' className={classes.gridHome}>
                <Hidden only='xs'>
                    <Hidden only='sm'>
                        <Grid item md={6} className={classes.gridTitle}>
                            <Typography className={classes.title}>Medico</Typography>
                            <Typography className={classes.loginTitle}>Sign in or create an account </Typography>
                            <Typography className={classes.slogan}>Made with <FavoriteIcon className={classes.icon} /> by
                            <a href='https://www.oyeshubhu.com' rel='noreferrer noopener' target='_blank' className={classes.link}>
                                    &nbsp;Swpril Ahuja
                            </a>
                            </Typography>
                        </Grid>
                    </Hidden>

                </Hidden>


                <Grid item md={6}>
                    <Grid container direction='column' justify='center' alignItems='center' className={classes.loginGrid}>
                        <Paper elevation={5} className={classes.loginPaper}>
                            <Grid item className={classes.header}>
                                <Hidden mdUp>
                                    <Typography className={classes.medico}>Medico</Typography>
                                </Hidden>
                            </Grid>
                            <Grid item className={classes.signIn}>
                                Sign in
                            </Grid>
                            <Grid item className={classes.createAccount}>
                                <Typography className={classes.signUpLink}>
                                    New User?<Link to='/signUp' className={classes.signUpLink}>create an account </Link>
                                </Typography>

                            </Grid>
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}
                                validationSchema={Validation}
                                onSubmit={(values) => { dispatch(signIn(values)); }}
                            >
                                {({ errors, handleChange, touched }) =>
                                    <Form>
                                        <Grid item>
                                            <TextField
                                                className={classes.inputField}
                                                error={errors.email && touched.email}
                                                name='email'
                                                autoComplete='on'
                                                fullWidth
                                                variant='standard'
                                                onChange={handleChange}
                                                id='email'
                                                label='Email'
                                                helperText={
                                                    errors.email && touched.email
                                                        ? errors.email : null
                                                }
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                className={classes.inputField}
                                                error={errors.password && touched.password}
                                                variant='standard'
                                                onChange={handleChange}
                                                fullWidth
                                                name='password'
                                                label='Password'
                                                type='password'
                                                id='password'
                                                autoComplete='current-password'
                                                helperText={
                                                    errors.password && touched.password
                                                        ? errors.password
                                                        : null
                                                }
                                            />
                                        </Grid>
                                        <Grid item className={classes.buttonContainer}>
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                color='primary'
                                                className={classes.button}
                                            >Sign In</Button>
                                        </Grid>
                                    </Form>
                                }
                            </Formik>

                            {/* <Grid item className={classes.orLogin}>
                                <Typography className={classes.or}>Or</Typography>
                            </Grid>
                            <Grid item className={classes.socialGrid} style={{ marginTop: '.5vh', }}>
                                <Button variant='contained' fullWidth className={classes.facebook}>
                                    <FontAwesomeIcon icon={faFacebook} size='2x' /><Typography className={classes.socialTypo}>Continue with Facebook </Typography></Button>
                            </Grid>
                            <Grid item className={classes.socialGrid} style={{ marginTop: '.5vh', }}>
                                <Button variant='contained' fullWidth className={classes.insta}>
                                    <FontAwesomeIcon icon={faInstagram} size='2x' /><Typography className={classes.socialTypo}>Continue with Instagram </Typography></Button>
                            </Grid>
                            <Grid item className={classes.socialGrid} style={{ marginTop: '.5vh', marginBottom: '3vh' }}>
                                <Button variant='contained' fullWidth className={classes.google}>
                                    <FontAwesomeIcon icon={faGoogle} size='2x' /><Typography className={classes.socialTypo}>Continue with Google </Typography></Button>
                            </Grid> */}
                            <Grid item className={classes.header}>
                                <Hidden mdUp>
                                    <Typography >Made with <FavoriteIcon className={classes.icon} /> by
                                        <a href='https://www.oyeshubhu.com' rel='noreferrer noopener' target='_blank' className={classes.link2}>
                                            &nbsp;Swpril Ahuja
                                        </a>
                                    </Typography>
                                </Hidden>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}

export default Home;