import { Fragment } from "react";
import HeadChatScreen from "../head-chat-screen";
import InputMessage from "../input-message";
import ShowMessages from "../show-message";
const ChatScreen = (props) => {
    return (
        <Fragment>
            {/* 4vw */}
            <HeadChatScreen/>
            {/* 42vw */}
            <ShowMessages/>
            {/* cacl(100vh-46vw) */}
            <InputMessage />
        </Fragment>
    )
}
export default ChatScreen;