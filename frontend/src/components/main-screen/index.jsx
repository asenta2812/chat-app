import { GridItem, useDisclosure } from '@chakra-ui/react';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { initRoom } from '../../utils/socketIO';
import { ChatScreenProvider } from '../../contexts/chat-screen-context';
import ChatScreen from '../chat-screen';
import InfoUser from '../info-user'
import HomeContext from '../../contexts/home-context';

export default function MainScreen(props) {
    const userChatId = props.match?.params?.id;

    const [roomState, setRoomState] = useState(null);
    const [participant, setParticipant] = useState(null);

    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

    const { socket } = useContext(HomeContext);

    useEffect(() => {
        if (!userChatId) return;
        // init room
        initRoom(userChatId, (room) => {
            setRoomState(room);
            const participant = room.participants.find(f => f.userId._id === userChatId);
            setParticipant(participant);
        }, socket);
    }, [userChatId])
    return (
        <>
            {roomState && participant ?
                <Fragment>
                    <GridItem colSpan={isOpen ? 2 : 3} borderX="1px solid gray">
                        <ChatScreenProvider
                            value={{
                                room: roomState,
                                participant: participant,
                                toggleInfo: onToggle,
                                isOpenInfo: isOpen
                            }}>
                            <ChatScreen />
                        </ChatScreenProvider>
                    </GridItem>
                    <GridItem colSpan={isOpen ? 1 : 0}>
                        <InfoUser participant={participant} />
                    </GridItem>
                </Fragment>
                : ''}
        </>
    )
}
