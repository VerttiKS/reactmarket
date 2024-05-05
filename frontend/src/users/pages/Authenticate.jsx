import React, { useRef, useState, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from 'react-router'

import Card from "../../shared/components/Card";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";

import { AuthContext } from "../../shared/context/auth-context";
import { signUpUser, loginUser } from "../api/users";

import './Authenticate.css';
const Authenticate = props => {

    const auth = useContext(AuthContext);

    const navigate = useNavigate()

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const adminRef = useRef();


    const [isLoginMode, setLoginMode] = useState(true);

    const switchModeHanlder = () => {
        setLoginMode(prevMode => !prevMode);
    }

    const signUpUserMutation = useMutation({
        mutationFn: signUpUser,
        onSuccess: (data) => {
            // Will execute only once, for the last mutation,
            // regardless which mutation resolves first
            auth.login(data.id, data.token, data.name);
            navigate("/");
        },
        onError: (error) => {
            // An error happened!
            console.log(error);
        }
    });

    const loginUserMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // Will execute only once, for the last mutation,
            // regardless which mutation resolves first
            auth.login(data.id, data.token, data.name);
            navigate("/");
        },
        onError: (error) => {
            // An error happened!
            console.log(error);
        }
    });

    const onSubmitHandler = event => {
        event.preventDefault();
        if (isLoginMode) {
            loginUserMutation.mutate({
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
        } else {

            var adminVal = false;
            if(adminRef.current.value == "adminpassword")
            {
                adminVal = true;
            }

            signUpUserMutation.mutate({
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                admin: adminVal
            })
        }
    }

    return (
        <Card className="authentication">
            <h2>Sign Up</h2>
            <form onSubmit={onSubmitHandler}>
                {!isLoginMode &&
                    <Input id="name" ref={nameRef} type="text" label="Name"
                    />}
                <Input id="email" ref={emailRef} type="text" label="Email" />
                <Input id="password" ref={passwordRef} type="password" label="Password" />
                {!isLoginMode &&
                    <Input id="admin" ref={adminRef} type="password" label="Admin password"
                    />}
                <Button type="submit" disable={signUpUserMutation.isLoading}>
                    {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHanlder}>
                {isLoginMode ? 'SignUp' : 'Login'} instead?
            </Button>
        </Card>
    )
};

export default Authenticate;