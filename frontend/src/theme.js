import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const customTheme = {
    colors: {
        colorTheme: {
            100: '#f0f6fc',
            200: '#c9d1d9',
            300: '#b1bac4',
            400: '#8b949e',
            500: '#6e7681',
            600: '#484f58',
            700: '#30363d',
            800: '#21262d',
            900: '#161b22',
            101: '#0d1117',
            102: '#010409',
            link: '#005cc5'
        },
    },
    styles: {
        global: (props) => ({
            body: {
                // fontFamily: 'Open sans',
                color: mode('colorTheme.800', 'colorTheme.200')(props),
                bg: mode('white', 'colorTheme.101')(props),
                lineHeight: 'base'
            },
        }),
    },
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
};
export default extendTheme({
    ...customTheme,
});
