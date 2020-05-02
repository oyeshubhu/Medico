import {
    SIGN_IN, SIGN_OUT, SIGN_UP, UPDATE_USER, POST_PRESCRIPTION,
    GET_PRESCRIPTIONS, POST_APPOINTMENT, GET_APPOINTMENTS,
    DELETE_APPOINTMENT, DELETE_PRESCRIPTION, DELETE_USER
} from './types';
import apis from '../apis/api';
import history from '../history';
export const signUp = (values) => async dispatch => {
    let response;
    try {
        response = await apis.post('/users', values);
        if (response.status === 201) {
            localStorage.setItem('jwt', response.data.token)
        }
        dispatch({
            type: SIGN_UP,
            payload: response.data
        });
        history.push('/');
    } catch (e) {

    }

}

export const signIn = (values) => async dispatch => {
    let response;
    try {
        response = await apis.post('/users/login', values);
        if (response.status === 200) {
            localStorage.setItem('jwt', response.data.token)
        }
        dispatch({
            type: SIGN_IN,
            payload: response.data
        });
        history.push('/dashboard');
    } catch (e) {
    }
}

export const signOut = () => async dispatch => {
    await apis.post('/users/logout',
        apis.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('jwt')
    );
    localStorage.removeItem('jwt')
    dispatch({
        type: SIGN_OUT
    });
    history.push('/')

}

export const deleteUser = () => async dispatch => {

    await apis.delete('/users/me',
        apis.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('jwt')
    );
    localStorage.removeItem('jwt')
    dispatch({
        type: DELETE_USER
    });
    console.log('success');
    history.push('/')

}


export const updateUser = (values) => async dispatch => {
    const response = await apis.patch('/users/me', values,
        apis.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('jwt')
    );
    localStorage.removeItem('jwt')
    dispatch({
        type: UPDATE_USER,
        payload: response.data
    });
    history.push('/profile')

}

export const postPrescription = (values) => async dispatch => {
    const response = await apis.post('/prescription', values,
        apis.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('jwt')
    );
    dispatch({
        type: POST_PRESCRIPTION,
        payload: response.data
    });
    history.push('/dashboard')

}

export const getPrescriptions = () => async dispatch => {
    const response = await apis.get('/prescriptions',
        apis.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('jwt')
    );
    dispatch({
        type: GET_PRESCRIPTIONS,
        payload: response.data
    });
    history.push('/dashboard')

}

export const postAppointment = (values) => async dispatch => {
    const response = await apis.post('/appointment', values,
        apis.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('jwt')
    );
    dispatch({
        type: POST_APPOINTMENT,
        payload: response.data
    });
    history.push('/viewAppointment')

}

export const getAppointment = () => async dispatch => {
    const response = await apis.get('/appointments',
        apis.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('jwt')
    );
    dispatch({
        type: GET_APPOINTMENTS,
        payload: response.data
    });
    history.push('/viewAppointment')

}

export const deleteAppointment = (values) => async dispatch => {
    await apis.delete(`/appointment/${values}`,
        apis.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('jwt')
    );
    dispatch({
        type: DELETE_APPOINTMENT,
    });
    history.push('/viewAppointment')

}

export const deletePrescription = (values) => async dispatch => {
    await apis.delete(`/prescription/${values}`,
        apis.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('jwt')
    );
    dispatch({
        type: DELETE_PRESCRIPTION,
    });
    history.push('/dashboard')

}