import { Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMe } from '../actions/authen.action';
import { onNewMessage } from '../actions/chat.action';
import MainScreen from '../components/main-screen';
import Sidebar from '../components/side-bar';
import { HomeProvider } from '../contexts/home-context';
import { initSocket, messageFromServerToClient } from '../utils/socketIO';
const HomePage = (props) => {

    const [socket, setSocket] = useState(null);


    useEffect(() => {
        // get me 
        props.getMe();

        // init socket
        setSocket(initSocket(props.token));
    }, [])

    useEffect(() => {
        if (!socket) return;
        // // on message push
        messageFromServerToClient((message) => {
            props.onNewMessage(message);
        }, socket)
    }, [socket])

    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={1} maxW="100%" height="100vh" overflow="hidden">
            {socket ?
                <HomeProvider value={{ socket }} >
                    {/* Begin Friends Sidebar */}
                    <GridItem colSpan={1}>
                        <Sidebar history={props.history} />
                    </GridItem>
                    {/* End Friends Sidebar */}
                    <MainScreen {...props} socket={socket} />
                </HomeProvider> : ''}
        </Grid>
    )
}

const mapStateToProps = ({ authen }) => ({
    token: authen.token?.token,
    isLoading: authen.isLoading
})

const mapDispatchToProps = {
    getMe,
    onNewMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
