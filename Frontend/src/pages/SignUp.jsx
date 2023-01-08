import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Main, 
    Logo, 
    ContainerForm, 
    TitleForm, 
    Form, 
    ButtonForm,
    ParagraphForm,
    ErrorMessage } from '../components/SignComponents';

import { api } from '../lib/axios';

export const SignUp = () => {
    const defaultUser = {
        email: '',
        name: '',
        password: '',
        passwordConfirmation: '',
    }
    const defaultErrors = {
        email: false,
        name: false,
        password: false,
        passwordConfirmation: false,
    }
    const [user, setUser] = useState(defaultUser)
    const [errors, setErrors] = useState(defaultErrors)

    const handleInput = (event) =>{
        const data = event.target

        setUser({
            ...user,
            [data.name] : data.value,
        })
    }

    const isValidEmail = email => (/\S+@\S+\.\S+/.test(email))

    const signUp = () => {
        api.post('/signup/', user)
            .then(response => {
                console.log(response)
                alert('Congratulations! Your account has been successfully created.')
                setUser(defaultUser)
            })
            .catch(error => {
                console.log(error)
                if(error.response.status === 409){
                    alert('A user with that email already exists.')
                }
            })
    }

    const submit = () => {
        let canSubmit = true;
        setErrors(defaultErrors)

        if ( user.email === "" || !isValidEmail(user.email)){
            setErrors(prevState =>({
                ...prevState,
                email : true
            }))
            canSubmit = false
        }

        if ( user.name === ""){
            setErrors(prevState =>({
                ...prevState,
                name : true,
            }))
            canSubmit = false
        }

        if ( user.password === "" ) {
            setErrors(prevState =>({
                ...prevState,
                password : true,
            }))
            canSubmit = false

        }else{  
            if( user.password !== user.passwordConfirmation ){
                setErrors(prevState =>({
                    ...prevState,
                    passwordConfirmation : true,
                }))
                canSubmit = false
            }
        }

        if(canSubmit) {                        
            signUp()
        }else{
            console.log('cannot submit')
        }
    }

    return(
        <Main>

            <Logo>UniBook</Logo>

            <ContainerForm>

                <TitleForm>Create an Account</TitleForm>
                <Form>
                    
                    { errors.email ? <ErrorMessage>Invalid email address</ErrorMessage> : null }
                    <input type='text' name='email' placeholder='Email' value={user.email} onChange={handleInput}></input>
                    
                    { errors.name ? <ErrorMessage>The name is required</ErrorMessage> : null }
                    <input type='text' name='name' placeholder='Name' value={user.name} onChange={handleInput}></input>
                    
                    { errors.password ? <ErrorMessage>The password is required</ErrorMessage> : null }
                    { errors.passwordConfirmation ? <ErrorMessage>The passwords don't match</ErrorMessage> : null }

                    <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleInput}></input>
                    <input type='password' name='passwordConfirmation' placeholder='Password Confirmation' value={user.passwordConfirmation} onChange={handleInput}></input>
                </Form>

                <ButtonForm onClick={submit}>Create</ButtonForm>
                
                <ParagraphForm>
                    Already have an account?    
                    <Link to="/signin/"> Sign in. </Link>
                </ParagraphForm>
            </ContainerForm>
        </Main>
    )
}