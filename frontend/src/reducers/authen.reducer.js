import ActionKey from '../constants/ActionKey';
import ConstantValue from '../constants/ConstantValue';
import { getItemInStorage } from '../utils';

const initialState = {
    isLoading: false,
    currentUser: null,
    token: getItemInStorage(),
    error: '',
    userSignUp: null,
};

const authenReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionKey.SignIn + 'Started': {
            return { ...state, isLoading: true };
        }
        case ActionKey.SignIn + 'Succeeded': {
            const { token } = payload;

            // save local storage
            localStorage.setItem(
                ConstantValue.AccessTokenStorageKey,
                JSON.stringify({ ...token, rememberme: payload?.rememberme })
            );
            return {
                ...state,
                isLoading: false,
                token,
                error: null,
            };
        }
        case ActionKey.SignIn + 'Failed': {
            return { ...state, isLoading: false, error: payload?.message };
        }

        case ActionKey.SignUp + 'Started': {
            return { ...state, isLoading: true };
        }
        case ActionKey.SignUp + 'Succeeded': {
            const { data } = payload;
            return {
                ...state,
                isLoading: false,
                error: null,
                userSignUp: { username: data.username, name: data.name, password: '', confirmPassword: ''},
            };
        }
        case ActionKey.SignUp + 'Failed': {
            return { ...state, isLoading: false, error: payload?.message };
        }

        case ActionKey.GetMe + 'Started': {
            return { ...state, isLoading: true };
        }
        case ActionKey.GetMe + 'Succeeded': {
            const { user } = payload;
            return {
                ...state,
                isLoading: false,
                error: null,
                currentUser: user,
            };
        }
        case ActionKey.GetMe + 'Failed': {
            return { ...state, isLoading: false, error: payload?.message };
        }

        // SignOut
        case ActionKey.SignOut + 'Started': {
            return { ...state, isLoading: true };
        }
        case ActionKey.SignOut + 'Succeeded': {
            localStorage.removeItem(ConstantValue.AccessTokenStorageKey);
            return {
                ...state,
                isLoading: false,
                error: null,
                currentUser: null,
                token: null,
            };
        }
        case ActionKey.SignOut + 'Failed': {
            return { ...state, isLoading: false, error: payload?.message };
        }

        case ActionKey.Unauthorized:
            localStorage.removeItem(ConstantValue.AccessTokenStorageKey);
            return { ...state, currentUser: null, token: null };

        default:
            return state;
    }
};
export default authenReducer;
