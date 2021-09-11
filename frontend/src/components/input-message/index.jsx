import { Box, HStack, Input, InputGroup } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { HiPaperAirplane, HiPlusSm } from 'react-icons/hi';
import { connect } from 'react-redux';
import ChatScreenContext from '../../contexts/chat-screen-context';
import HomeContext from '../../contexts/home-context';
import { sendMessageFromClientToServer } from '../../utils/socketIO';
import IconButtonStyle from '../icon-button';

function InputMessage(props) {
    const [message, setMessage] = useState('');
    const { room } = useContext(ChatScreenContext);
    const { socket } = useContext(HomeContext);

    const onSendMessage = (e) => {
        e.preventDefault();
        if (message) {
            const messageSendServer = {
                content: message,
                senderId: props.currentUser?._id,
                conversationId: room?._id,
                socketId: socket.id
            }
            sendMessageFromClientToServer(messageSendServer, () => {
                setMessage('');
            })
        }
    }
    return (
        <Box borderTop="1px solid gray">
            <HStack height="3vw" justifyContent="space-between" alignItems="center" p={2}>
                <IconButtonStyle icon={<HiPlusSm />} />
                <InputGroup>
                    <Input
                        variant="flushed"
                        type="text"
                        placeholder="Type your message ..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' ? onSendMessage(e) : null}
                    />
                </InputGroup>
                <IconButtonStyle icon={<HiPaperAirplane />} onClick={e => onSendMessage(e)} />
            </HStack>
        </Box>
    )
}
const mapStateToProps = ({ authen }) => ({
    currentUser: authen.currentUser
})
export default connect(mapStateToProps, null)(InputMessage);

