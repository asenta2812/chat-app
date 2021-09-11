import { Avatar, Box, Flex, Heading, Input, InputGroup, InputLeftElement, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { HiLogout, HiSearch } from "react-icons/hi";
import { connect } from 'react-redux';
import { signOut } from '../../actions/authen.action';
import IconButtonStyle from '../icon-button';

function HeadSideBar(props) {
    const signOut = (e) => {
        e.preventDefault();
        props.signOut(() => {
            props.history.push("/sign-in");
        });
    }
    return (
        <Box height="6.5vw" p="3" position="sticky">
            <Flex justify="space-between" align="center">
                <Box>
                    <WrapItem>
                        <Avatar name={props.currentUser?.name} src={props.currentUser?.avatar} size="md" />
                    </WrapItem>
                </Box>
                <Heading as="h1" size="lg">Chat App</Heading>
                <Box>
                    <IconButtonStyle aria-label="settings" onClick={signOut} icon={<HiLogout />} />
                </Box>
            </Flex>

            {/* Start Search Bar */}
            <InputGroup mt={2}>
                <InputLeftElement
                    pointerEvents="none"
                    children={<HiSearch color="gray.300" />}
                />
                <Input variant="flushed" placeholder="Search...." />
            </InputGroup>
            {/* End Search Bar */}

        </Box>
    )
}
const mapStateToProps = ({ authen }) => ({
    currentUser: authen.currentUser
})
const mapDispatchToProps = {
    signOut
}
export default connect(mapStateToProps, mapDispatchToProps)(HeadSideBar)
