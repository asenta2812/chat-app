import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignUp from './pages/SignUp';
import AuthenTemplate from './templates/authen';
import MainTemplate from './templates/main';
const routes = [
    {
        path: '/',
        exact: true,
        Page: HomePage,
        useTemplate: MainTemplate
    },
    {
        path: '/v/:id',
        exact: true,
        Page: HomePage,
        useTemplate: MainTemplate
    },
    {
        path: '/sign-in',
        exact: true,
        Page: LoginPage,
        useTemplate: AuthenTemplate
    },
    {
        path: '/sign-up',
        exact: true,
        Page: SignUp,
        useTemplate: AuthenTemplate
    }
];

const renderRoute = () =>
    <Switch>
        {
            routes.map((item, index) => {
                    return React.createElement(item.useTemplate, { ...item, key: index })
            })
        }
        <Redirect to="/" />
    </Switch>
export default renderRoute;
