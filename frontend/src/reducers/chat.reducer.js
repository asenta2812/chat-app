import ActionKey from '../constants/ActionKey';

const initialState = {
    newMessage: null,
};

const chatReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionKey.OnNewMessage: {
            return { ...state, newMessage: payload};
        }
        default:
            return state;
    }
};
export default chatReducer;
