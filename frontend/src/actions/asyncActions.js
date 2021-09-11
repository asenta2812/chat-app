import { AsyncActionStatus } from '../constants/ConstantValue';
import axiosConfig from '../apis/axios';

export function startedAsyncAction(type) {
    type = type + 'Started';
    return {
        type,
        status: AsyncActionStatus.STARTED,
    };
}

export function succeededAsyncAction(type, payload) {
    type = type + 'Succeeded';
    return {
        type,
        status: AsyncActionStatus.SUCCEEDED,
        payload,
    };
}

export function failedAsyncAction(type, message) {
    type = type + 'Failed';
    return {
        type,
        status: AsyncActionStatus.FAILED,
        payload: message,
    };
}

export const postRequestAsyncAction =
    (request, type, url, options) => async (dispatch) => {
        dispatch(startedAsyncAction(type));
        axiosWithMethod('POST', url, request)
            .then((result) => {
                if (
                    options &&
                    options.callback &&
                    typeof options.callback === 'function'
                ) {
                    options.callback();
                }
                return dispatch(
                    succeededAsyncAction(type, {
                        ...result,
                    })
                );
            })
            .catch((error) => {
                dispatch(failedAsyncAction(type, error));
            });
    };
export const getRequestAsyncAction =
    (request, type, url, options) => async (dispatch) => {
        dispatch(startedAsyncAction(type));

        axiosWithMethod('GET', url, request)
            .then((result) => {
                if (
                    options &&
                    options.callback &&
                    typeof options.callback === 'function'
                ) {
                    options.callback();
                }
                return dispatch(
                    succeededAsyncAction(type, {
                        ...result,
                    })
                );
            })
            .catch((error) => {
                dispatch(failedAsyncAction(type, error));
            });
    };

function axiosWithMethod(method = 'GET' | 'POST', url, request) {
    switch (method) {
        case 'GET':
            return axiosConfig.get(url, {
                params: { ...request },
            });
        case 'POST':
            return axiosConfig.post(url, { ...request });
        default:
            return new Promise();
    }
}
