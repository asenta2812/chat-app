import { Avatar, Box, Flex, Text, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactItem({ isShowMessage = false, user, message }) {
    return (
        <Box height="auto" width="100%" p={2}
            borderRadius="10px"
            _hover={{ boxShadow: '0px 0px 10px 5px rgba(255,255,255,0.1)' }}
        >
            <Link to={`/v/${user?._id}`}>
                <Flex align="center">
                    <WrapItem mr="3">
                        <Avatar size="md" src={user?.avatar} name={user?.name} />
                    </WrapItem>
                    <Box>
                        <Text fontWeight="semibold" fontSize="md">{user?.name}</Text>
                        {isShowMessage ? <Text>{message.content}</Text> : ''}
                    </Box>
                </Flex>
            </Link>
        </Box>
    )
}
