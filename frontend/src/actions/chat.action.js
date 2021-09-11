import ActionKey from "../constants/ActionKey"

export const onNewMessage = (message) => (dispatch) => {
    dispatch({ type: ActionKey.OnNewMessage, payload: message})
}