import io from 'socket.io-client';
import ConstantValue from '../constants/ConstantValue';
import { showError } from '../services/show-toast.service';

let socket;
export function initSocket(token) {
    socket = io.connect(ConstantValue.BaseHost, {
        auth: {
            token,
        },
    });
    // log error
    socket.on('connect_error', (err) => {
        showError(err.message);
    });
    return socket;
}
export function initRoom(participantId, callback, socketInput = socket) {
    socket.removeListener('messageFromClientToServer');

    socketInput.emit(
        'joinRoom',
        { userId: participantId },
        ({ error, room }) => {
            showError(error);
            if (typeof callback === 'function') {
                callback(room);
            }
        }
    );
}
export function messageFromServerToClient(callback, socketInput = socket) {
    // mo connect get data from server
    socketInput.on('messageFromServerToClient', ({ message }) => {
        if (typeof callback === 'function') {
            callback(message);
        }
    });
}
export function newUserSignUp(callback, socketInput = socket){
    socketInput.on('newUserSignUp', (data) => {
        if (typeof callback === 'function') {
            callback(data);
        }
    });
}
export function sendMessageFromClientToServer(
    message,
    callback,
    socketInput = socket
) {
    socketInput.emit('messageFromClientToServer', message, ({ error }) => {
        if (error) {
            showError(error.message);
        }
        if (typeof callback === 'function') {
            callback();
        }
    });
}
