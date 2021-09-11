import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './stores/index';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
ReactDOM.render(
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </Provider>,
    document.getElementById('root')
);
