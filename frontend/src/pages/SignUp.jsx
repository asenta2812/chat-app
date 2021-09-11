import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { onSignUp } from '../actions/authen.action';
import CardForm from '../components/card-form';
import LinkStyle from '../components/link-style';
import PassWordField from '../components/pasword-field';
import KeyMessage from '../constants/error/key-message';
import { showError } from '../services/show-toast.service';

function SignUp(props) {

    // state input user signup 
    const [userSignUp, setUserSignUp] = useState(props.userSignUp || {
        username: '',
        password: '',
        confirmPassword: '',
        name: ''
    })

    // on change input signup 
    const onChangeInputSignUp = (event) => {
        const element = event.target;
        const name = element.getAttribute('name');
        setUserSignUp({ ...userSignUp, [name]: element.value })
    }
    // handle event login
    const clickSignUp = () => {
        if (!userSignUp.username) {
            return showError(KeyMessage.UserNameRequired)
        }
        if (!userSignUp.password) {
            return showError(KeyMessage.PasswordRequired)
        }
        if (userSignUp.password !== userSignUp.confirmPassword) {
            return showError(KeyMessage.ConfirmPasswordNotMatch)
        }
        props.onSignUp({ request: userSignUp }, () => {
            props.history.push('/sign-in');
        });
    }
    return (
        <Fragment>
            <Box w="md">
                <Heading size="2xl" textAlign="center" fontWeight="extrabold">
                    Sign Up
                </Heading>
                <Text align="center" my="8" fontSize="lg" fontWeight="bold">
                    Do you have an account?
                    <LinkStyle to="/sign-in">Sign In</LinkStyle>
                </Text>
                <CardForm>
                    <Stack spacing="6">
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={userSignUp.name}
                                onChange={onChangeInputSignUp}
                            />
                        </FormControl>
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={userSignUp.username}
                                onChange={onChangeInputSignUp}
                            />
                        </FormControl>

                        <PassWordField
                            value={userSignUp.password}
                            onChange={onChangeInputSignUp} />

                        <PassWordField
                            isConfirmPassword
                            value={userSignUp.confirmPassword}
                            onChange={onChangeInputSignUp} />

                        <Button
                            colorScheme="blue"
                            size="lg" fontSize="md"
                            type="submit"
                            onClick={clickSignUp}>Sign Up</Button>
                    </Stack>
                </CardForm>
            </Box>
        </Fragment>
    )
}
const mapStateToProps = ({ authen }) => ({
    userSignUp: authen.userSignUp
})
const mapDispatchToProps = {
    onSignUp
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
