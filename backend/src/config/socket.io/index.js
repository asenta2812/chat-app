import { verifyToken } from '../../helpers/authentication';
import ErrorHandler, { throwError } from '../../helpers/error';
import StatusCode from '../values/status-code';
import ChatController from '../../app/controllers/ChatController';
import { instrument } from '@socket.io/admin-ui';
import AuthenticationController from '../../app/controllers/AuthenticationController';
export default function initSocketIO(server, app) {
    // config socketio
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            // origin: ['http://localhost:8000']
        },
    });

    const chatController = new ChatController();
    let socketIdWithUserId = [];

    io.use(async function (socket, next) {
        // Authentication socket with jwt
        if (socket.handshake.auth && socket.handshake.auth.token) {
            try {
                const decoded = await verifyToken(socket.handshake.auth.token);
                socket.decoded = decoded?.data;
                next();
            } catch (err) {
                const error = new ErrorHandler(
                    StatusCode.Unauthorized,
                    'Unauthorized'
                );
                next(error);
            }
        } else {
            const error = new ErrorHandler(
                StatusCode.Unauthorized,
                'Unauthorized'
            );
            next(error);
        }
    }).on('connection', (socket) => {
        socketIdWithUserId[socket.decoded._id.toString()] = socket.id;

        socket.on('joinRoom', async ({ userId }, callback) => {
            const { error, room } = await chatController.joinRoom(
                userId,
                socket.decoded
            );

            if (error) return callback({ error });

            // socket.join(room._id.toString());
            callback({ room });
        });

        socket.on('messageFromClientToServer', async (message, callback) => {
            // create message in collection messages
            const { error, messageCreate, toId } =
                await chatController.receiveMessageFromClient(message);
            if (error) return callback({ error });

            // emit to another people by socketId
            io.to([
                socketIdWithUserId[toId],
                socketIdWithUserId[message.senderId.toString()],
            ]).emit('messageFromServerToClient', {
                message: messageCreate,
            });
            callback({ message });
        });

        socket.on('disconnect', () => {
            socketIdWithUserId[socket.decoded._id.toString()] = null;
        });
    });

    instrument(io, {
        auth: false,
    });

    app.use(function (req, res, next) {
        req.io = io;
        next();
    });
}
