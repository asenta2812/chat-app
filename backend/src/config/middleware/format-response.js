import StatusCode from '../values/status-code';

export default function formatResponse(req, res, next) {
    const status = res.responseStatus || StatusCode.OK;
    const data = res.bodyResponse;
    res.status(status).send({ 
        statusCode: status, 
        status: 'success',
        response: data
    });
}
