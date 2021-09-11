import StatusCode from '../values/status-code';

const handleError = (err, req, res, next) => {
    const { statusCode = StatusCode.ServerError, message } = err;
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};
export default handleError;
