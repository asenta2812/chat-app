import StatusCode from '../config/values/status-code';
import SystemMessage from '../config/values/system-message';

export default class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        if (process.env.NODE_ENV !== 'production') {
            this.message = message;
        } else {
            this.message = SystemMessage.ProductionErrorMessage;
        }
    }
}
export function throwError({ statusCode = StatusCode.ServerError, message }) {
    throw new ErrorHandler(statusCode, message);
}
