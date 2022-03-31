import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, Header, Label } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import MyTextInput from '../../common/form/MyTextInput';



export default observer(function LoginForm(){

   
    const { userStore } = useStore();
    const history = useHistory();
    function handleFormSubmit() {
        history.push('/activities')
    }



    return (
        <Formik

            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore.login(values)
                    .catch(error =>
                        setErrors({ error: 'Invalid email or password' })
                    ).then(handleFormSubmit)
                
            }
            >

            {({ handleSubmit, isSubmitting,errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Activities' color='teal' textAlign='center'/>
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() =>
                            <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error}/>}
                    />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>
             )}


        </Formik>

    )
    

})
