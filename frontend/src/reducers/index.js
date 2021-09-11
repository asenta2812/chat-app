import { combineReducers } from 'redux';
import ConstantValue from '../constants/ConstantValue';
import authenReducer from './authen.reducer';
import chatReducer from './chat.reducer';

export default combineReducers({
    store: () => 'Hi there',
    languageId: () => ConstantValue.LanguageKey.Eng,
    authen: authenReducer,
    chat: chatReducer
});
