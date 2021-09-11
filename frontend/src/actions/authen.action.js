import ActionKey from '../constants/ActionKey';
import { getRequestAsyncAction, postRequestAsyncAction } from './asyncActions';

export const onSignIn = ({ request }) =>
    postRequestAsyncAction(
        request,
        ActionKey.SignIn,
        'user/signin',
        'rememberme'
    );

export const onSignUp = ({ request }, callback) =>
    postRequestAsyncAction(request, ActionKey.SignUp, 'user/signup', {
        callback,
    });

export const getMe = () =>
    getRequestAsyncAction({}, ActionKey.GetMe, 'user/me');

export const signOut = (callback) =>
    getRequestAsyncAction({}, ActionKey.SignOut, 'user/logout', { callback });
