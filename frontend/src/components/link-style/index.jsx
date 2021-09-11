import { Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

export default function LinkStyle(props) {
    return (
        <Link as={RouterLink} {...props} 
            marginLeft="1"
            color="colorTheme.link"
        />
    )
}
