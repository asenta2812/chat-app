import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { onSignIn } from "../actions/authen.action";
import CardForm from '../components/card-form';
import LinkStyle from '../components/link-style';
import PassWordField from '../components/pasword-field';
import KeyMessage from "../constants/error/key-message";
import { showError } from "../services/show-toast.service";
const LoginPage = (props) => {
    // state input user signin 
    const [userLogin, setUserLogin] = useState({ username: '', password: '', rememberme: true });

    // redirect when login {user, error}
    useEffect(() => {
        if (props.token) {
            props.history.push('/');
        }
        if (props.userSignUp) {
                setUserLogin({ ...userLogin, username: props.userSignUp.username });
        }
    }, [props.token, props.userSignUp])

    // on change input login 
    const onChangeInputLogin = (event) => {
        const element = event.target;
        const name = element.getAttribute('name');
        const type = element.getAttribute('type');
        if (type === 'checkbox') {
            setUserLogin({ ...userLogin, [name]: element.checked })
        } else {
            setUserLogin({ ...userLogin, [name]: element.value })
        }
    }
    // handle event login
    const clickSignIn = () => {
        if (!userLogin.username) {
            return showError(KeyMessage.UserNameRequired)
        }
        if (!userLogin.password) {
            return showError(KeyMessage.PasswordRequired)
        }
        props.onSignIn({ request: userLogin });
    }


    return (
        <Fragment>
                <Box w="md">
                    <Heading size="2xl" textAlign="center" fontWeight="extrabold">
                        Sign In
                    </Heading>
                    <Text align="center" my="8" fontSize="lg" fontWeight="bold">
                        Don't have an account?
                        <LinkStyle to="/sign-up">Sign up</LinkStyle>
                    </Text>
                    <CardForm>
                        <Stack spacing="6">
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <Input
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={userLogin.username}
                                    onChange={onChangeInputLogin}
                                />
                            </FormControl>

                            <PassWordField
                                isUseLogin
                                value={userLogin.password}
                                onChange={onChangeInputLogin}  />

                            <Button
                                colorScheme="blue"
                                size="lg" fontSize="md"
                                type="submit"
                                onClick={clickSignIn}>Sign In</Button>
                        </Stack>


                    </CardForm>
                </Box>
        </Fragment>
    )
}

const mapDispatchToProps = {
    onSignIn
}
const mapStateToProps = ({ authen }) => ({
    token: authen.token,
    userSignUp: authen.userSignUp
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);