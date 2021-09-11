import { Box, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from '../../apis/axios'
import ContactItem from '../contact-item'

const ChatRecent = (props) => {
    const [messageRecent, setMessageRecent] = useState([])
    useEffect(() => {
        axios.get('/chat/chat-recent').then(({ messages }) => {
            setMessageRecent(messages || [])
        })
    }, []);
    useEffect(() => {
        if (!props.newMessage) return;
        const index = messageRecent.findIndex(f => f._id === props.newMessage.conversationId);
        if (index !== -1) {
            messageRecent[index].message = props.newMessage.data;
            // swap index
            [messageRecent[0], messageRecent[index]] = [messageRecent[index], messageRecent[0]];
            setMessageRecent([...messageRecent])
        } else {
            const [participant] = props.newMessage.participants.filter(f => f._id !== props.currentUser._id)
            const newMessage = {
                _id: props.newMessage.conversationId,
                message: props.newMessage.data,
                participant
            }
            // add to first list 
            messageRecent.unshift(newMessage);
            setMessageRecent([...messageRecent]);
        }
    }, [props.newMessage])


    const renderMessageRecent = () => {
        if (messageRecent.length === 0) return;

        return messageRecent.map((item, index) => {
            return <ContactItem message={item.message} user={item.participant} isShowMessage key={index} />
        })
    };


    return (
        <Box p="2" my="2">
            <VStack spacing="5px">
                {messageRecent && messageRecent.length > 0 ? renderMessageRecent() : <Text align="center">You don't have any recent conversations</Text>}
            </VStack>
        </Box>
    )
}

const mapStateToProps = ({ chat, authen }) => ({
    newMessage: chat.newMessage,
    currentUser: authen.currentUser
})
export default connect(mapStateToProps, null)(ChatRecent);
