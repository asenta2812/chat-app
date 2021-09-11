import * as chatService from '../services/ChatService';

export default class ChatController{
    async joinRoom(paticipantId, currentUser) {
        try {
            return await chatService.joinRoom(paticipantId, currentUser);
        } catch (err) {
            return { error: err.message };
        }
    }

    async getRoomData(req, res, next) {
        try {
            const data = await chatService.getRoomData(req.params.id);
            res.bodyResponse = data;
            next();
        } catch (err) {
            next(err);
        }
    }
    async receiveMessageFromClient(message) {
        try {
            return await chatService.receiveMessageFromClient(message);
        } catch (err) {
            return { error: err.message };
        }
    }

    async getListChatRecent(req, res, next) {
        try {
            const data = await chatService.getListChatRecent(req.user._id);
            res.bodyResponse = data;
            next();
        } catch (err) {
            next(err);
        }
    }
}
