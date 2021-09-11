import { Box, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import axios from '../../apis/axios';
import ConstantValue from '../../constants/ConstantValue';
import HomeContext from '../../contexts/home-context';
import { showInfo } from '../../services/show-toast.service';
import { playSound } from '../../utils';
import { newUserSignUp } from '../../utils/socketIO';
import ContactItem from '../contact-item';
function ContactList(props) {

    const [listContacts, setListContacts] = useState([]);
    const { socket } = useContext(HomeContext);

    useEffect(() => {
        axios.get('/user/all-contact').then((response) => {
            setListContacts(response.contacts);
        })
    }, [])

    useEffect(() => {
        if (!socket) return;
        console.log('asd')
        newUserSignUp((dataSignUp) => {
            showInfo(`${dataSignUp.data.name} just joined the server!`)
            setListContacts(oldState => [...oldState, dataSignUp.data])
            
            playSound(ConstantValue.Sound.NewUser);
        }, socket)

        return () => {
            socket.removeListener('newUserSignUp')
        };
    }, [socket])

    const renderListContact = () => {
        return listContacts && listContacts.length > 0 ?
            listContacts.map((crr, index) => <ContactItem key={index} user={crr} />) : ''
    }


    return (
        <Box p="2" my="2">
            <VStack spacing="0.52vw">
                {renderListContact()}
            </VStack>
        </Box>
    )
}
export default ContactList
