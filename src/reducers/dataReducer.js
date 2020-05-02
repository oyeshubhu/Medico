import { GET_PRESCRIPTIONS, GET_APPOINTMENTS } from '../actions/types'

const INITIAL_STATE = {
    prescriptions: [],
    appointments: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRESCRIPTIONS:
            return { ...state, prescriptions: action.payload }
        case GET_APPOINTMENTS:
            return { ...state, appointments: action.payload }
        default:
            return state;
    }
}