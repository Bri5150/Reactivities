import React, { Fragment, useEffect } from 'react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { Button, Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import ModalContainer from '../../common/modals/ModalContainer';
import modalStore from '../stores/modalStore';


function App() {  
    const location = useLocation();
    const { commonStore, userStore,modalStore } = useStore();


    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    },[commonStore,userStore])


   // if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>

    //if (userStore.user==null) {
    //    <Redirect to='./login'/>
    //}


    if (commonStore.error) {
        return <ServerError />
    }
    return (
        <>
            <ToastContainer position='bottom-right' hideProgressBar />
            <ModalContainer />
            <Route exact path='/' component={HomePage} />
            <Route
                path={'/(.+)'}
                render={() => (
                    <>
                        <NavBar />
                        <Container style={{ marginTop: '7em' }}>
                            <Switch>
                                <Route exact path='/activities' component={ActivityDashboard} />
                                <Route path='/activities/:id' component={ActivityDetails} />
                                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                                <Route path='/errors' component={TestErrors} />
                                <Route path='/server-error' component={ServerError} />
                                <Route path='/login' component={LoginForm} />
                                <Route exact path='/' component={App} />
                                <Route component={NotFound} />
                            </Switch>



                        </Container>
                    </>                
                    )}
            />
        </>
    );
}

export default observer (App);

