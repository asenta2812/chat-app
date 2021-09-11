import { Avatar, Box, Flex, Heading, HStack, WrapItem } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { HiDotsHorizontal, HiDotsVertical, HiPhone, HiVideoCamera } from 'react-icons/hi'
import ChatScreenContext from '../../contexts/chat-screen-context'
import IconButtonStyle from '../icon-button'

export default function HeadChatScreen(props) {
    const { participant, toggleInfo, isOpenInfo } = useContext(ChatScreenContext);
    return (
        <Box
            height="4vw"
            p="3"
            position="sticky"
            borderBottom="1px solid gray"
        >
            <Flex justify="space-between" align="center">
                <Flex align="center">
                    <WrapItem>
                        <Avatar size="md" name={participant?.nickname} src={participant.userId?.avatar} />
                    </WrapItem>
                    <Heading ml="3" as="h2" size="lg">{participant?.nickname}</Heading>
                </Flex>
                <HStack>
                    <IconButtonStyle children={<HiPhone />} />
                    <IconButtonStyle children={<HiVideoCamera />} />
                    <IconButtonStyle children={isOpenInfo ? <HiDotsHorizontal /> : <HiDotsVertical />} onClick={() => toggleInfo()} />
                </HStack>
            </Flex>
        </Box>
    )
}
