import { Router } from 'express';
import ChatController from '../app/controllers/ChatController';
const router = Router();

const chat = new ChatController();

// [GET] /chat/all/:id
router.get('/all/:id', chat.getRoomData);
// [GET] /chat/chat-recent
router.get('/chat-recent', chat.getListChatRecent);


export default router;
