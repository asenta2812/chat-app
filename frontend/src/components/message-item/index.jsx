import { Avatar, Box, HStack, Text, useDisclosure, WrapItem } from '@chakra-ui/react'
import React from 'react'

export default function MessageItem({ isSender = false, user, message, ...props }) {
    const {isOpen, onToggle} = useDisclosure();
    const onShowDate = () => {
        onToggle()
        console.log('11')
    }
    return (
        <Box
            alignSelf={isSender ? "flex-end" : "flex-start"}
            maxW="60%"
        >

            <Box textAlign={isSender ? "right" : "left"}>
                <Text mb={1} display={isOpen ? 'block' : 'none'}>{message.dateFormat}</Text>
                <HStack spacing={1} alignItems="flex-end">
                    <Box
                        py={2} px={5}
                        bg={isSender ? "blue.500" : "gray"}
                        borderRadius={isSender ? "1.125rem 1.125rem 0 1.125rem " : "1.125rem 1.125rem 1.1235rem 0"}
                        onClick={onShowDate}
                    >
                        <Text>{message.content}</Text>
                    </Box>

                    {isSender ? <Avatar name={user.name} src={user.avatar} width="5" height="5" /> : ''}
                </HStack>
            </Box>


            {/* <Text>Seen</Text> */}
        </Box>
    )
}
