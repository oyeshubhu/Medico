import React from 'react';
import Home from './home';
import NewUser from './newUser';
import CreatePrescription from './createPrescription'
import Dashboard from './dashboard'
import ViewAppointment from './viewAppointment';
import CreateAppointment from './createAppointment';
import Profile from './profile';
import EditProfile from './editProfile';
import { Route, Switch } from 'react-router-dom';
const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' render={(props) => <Home {...props} />} />
                <Route exact path='/signUp' render={(props) => <NewUser {...props} />} />
                <Route exact path='/dashboard' render={(props) => <Dashboard {...props} />} />
                <Route exact path='/viewAppointment' render={(props) => <ViewAppointment {...props} />} />
                <Route exact path='/createAppointment' render={(props) => <CreateAppointment {...props} />} />
                <Route exact path='/createPrescription' render={(props) => <CreatePrescription {...props} />} />
                <Route exact path='/profile' render={(props) => <Profile {...props} />} />
                <Route exact path='/profile/edit' render={(props) => <EditProfile {...props} />} />
            </Switch>
        </div>
    );
}

export default App;