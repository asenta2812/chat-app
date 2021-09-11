import { IconButton } from '@chakra-ui/react'
import React from 'react'

export default function IconButtonStyle(props) {
    return (
        <IconButton isRound
            fontSize="2xl"
            bg="transparent" _hover={{ color: "blue.300" }} {...props} />
    )
}
