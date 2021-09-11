import { Box, VStack } from '@chakra-ui/react';
import moment from 'moment';
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import useSound from 'use-sound';
import axios from '../../apis/axios';
import ChatScreenContext from '../../contexts/chat-screen-context';
import MessageItem from '../message-item';

function ShowMessages(props) {
    const [messages, setMessages] = useState([]);
    const { room, participant } = useContext(ChatScreenContext);

    const [play, { stop }] = useSound('../sound-1.mp3');
    const chatRef = useRef(null);

    const getAllMessage = (roomId) => {
        axios.get('/chat/all/' + roomId)
            .then(result => {
                setMessages(result);
            })
    }
    useEffect(() => {
        if (!room) return;
        getAllMessage(room._id);
    }, [room])

    useEffect(() => {
        if (!props.newMessage) return;
        setMessages(messages => [...messages, props.newMessage.data]);
        play()
        return () => stop();
    }, [props.newMessage, props.currentUser])
    useLayoutEffect(() => {
        if (chatRef.current) {
            requestAnimationFrame(() => {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            })
        }
    }, [messages])

    const renderMessages = () => {
        if (!messages || messages.length === 0 || !props.currentUser) return '';
        return messages.map((item, index) => {
            const dateCreated = new Date(item.createdAt);
            const dateCurrent = moment().format('ddd');
            const dateFormat = moment(dateCreated).format('ddd, HH:mm').replace(dateCurrent, 'Today');
            item.dateFormat = dateFormat;
            if (item.senderId === props.currentUser?._id) {
                return (
                    <MessageItem isSender message={item} user={props.currentUser} key={`message-send-${index}`} />
                )
            }

            if (item.senderId === participant?.userId._id) {
                return (
                    <MessageItem message={item} user={participant.userId} key={`message-receive-${index}`} />
                )
            }
            return '';
        })
    }
    return (
        <Box ref={chatRef} height="calc(100vh - 7vw)" overflow="hidden" overflowY="auto" p={3}>
            <VStack justifyContent="space-between" spacing="20px">
                {renderMessages()}
            </VStack>
        </Box>
    )
}
const mapStateToProps = ({ authen, chat }) => ({
    currentUser: authen.currentUser,
    newMessage: chat.newMessage
})
export default connect(mapStateToProps, null)(ShowMessages);
