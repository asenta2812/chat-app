import { Box } from '@chakra-ui/react'
import React from 'react'

const CardForm = (props) => (
    <Box
        bg="colorTheme.800" borderRadius="md" boxShadow="md"
        p="6"
        {...props}
    />
)
export default CardForm;
