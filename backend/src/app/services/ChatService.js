import SystemMessage from '../../config/values/system-message';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import User from '../models/User';

export async function joinRoom(participantId, currentUser) {
    const currentUserId = currentUser._id;
    const participantInDb = await User.findById(participantId);
    if (!participantInDb) {
        return { error: SystemMessage.UserNotExists };
    }
    const userWithRoom = await Conversation.findOne({
        $or: [
            { participantIds: [currentUserId, participantId] },
            { participantIds: [participantId, currentUserId] },
        ],
    }).populate('participants.userId');
    if (userWithRoom) {
        return { room: userWithRoom };
    }
    let newRoom = await Conversation.create({
        name: '',
        participantIds: [currentUserId, participantId],
        participants: [
            {
                userId: currentUser,
                nickname: currentUser.name,
            },

            {
                userId: participantInDb,
                nickname: participantInDb.name,
            },
        ],
    });

    // newRoom.participantIds.forEach((f) => {
    //     if (f.userId.toString() === currentUserId.toString()) {
    //         f.userId = currentUser;
    //     }
    //     if (f.userId.toString() === participantId.toString()) {
    //         f.userId = participantInDb;
    //     }
    // });

    return { room: newRoom };
}
export async function getRoomData(roomId) {
    return await Message.find(
        { conversationId: roomId },
        '_id senderId type content url createdAt'
    ).sort({ createdAt: 1 });
}
export async function receiveMessageFromClient({
    senderId,
    conversationId,
    content,
}) {
    const messageNew = await Message.create({
        content,
        senderId,
        conversationId,
    });
    const conversation = await Conversation.findById(conversationId).populate(
        'participants.userId'
    );

    const participants = conversation?.participants.map(
        ({ userId, nickname }) => ({
            _id: userId._id,
            name: nickname || userId._name,
            avatar: userId.avatar,
        })
    );
    const [toId] = conversation.participantIds.filter((f) => f !== senderId);
    return {
        messageCreate: {
            data: {
                _id: messageNew._id,
                content: messageNew.content,
                type: messageNew.type,
                url: messageNew.url,
                createdAt: messageNew.createdAt,
                senderId: messageNew.senderId,
            },
            conversationId,
            participants,
        },
        toId: toId.toString(),
    };
}

export async function getListChatRecent(userId) {
    const conversations = await Conversation.find({
        'participants.userId': userId,
    }).populate('participants.userId');

    if (conversations.length === 0) return { message: [] };

    const listMessageNewest = await Message.aggregate([
        {
            $match: {
                conversationId: {
                    $in: conversations.map((f) => f._id),
                },
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $group: {
                _id: '$conversationId',
                message: {
                    $first: '$$ROOT',
                },
            },
        },
    ]);
    /**
     * { _id : conversationId, message, participant}
     */

    const listResult = listMessageNewest.map((item) => {
        const conversation = conversations.find(
            (f) => f._id.toString() === item._id.toString()
        );
        const [participant] = conversation.participants.filter(
            (f) => f.userId._id.toString() !== userId.toString()
        );
        return {
            ...item,
            participant: {
                _id: participant.userId._id,
                name: participant.nickname || participant.userId.name,
                avatar: participant.userId.avatar,
            },
        };
    });

    return { messages: listResult };
}
