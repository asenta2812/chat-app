import axios from 'axios';
import ActionKey from '../constants/ActionKey';
import ConstantValue from '../constants/ConstantValue';
import { showError } from '../services/show-toast.service';
import store from '../stores';
import { getItemInStorage } from '../utils';

// create default settings axios
const instance = axios.create({
    baseURL: ConstantValue.BaseApiUrl,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});
// Add a response interceptor
instance.interceptors.request.use(
    function (response) {
        // Do something with response data
        const url = response.url;
        if (url !== 'user/sigin' && url !== 'user/signup') {
            const token = getItemInStorage();
            if (token) {
                response.headers = {
                    ...response.headers,
                    Authentication: 'Bearer ' + token.token,
                };
            }
        }
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);
// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response?.data?.response;
    },
    function (error) {
        const errorData = error.response?.data || error;

        showError(errorData.message);
        if (errorData.statusCode === 401 || errorData.statusCode === 403) {
            store.dispatch({ type: ActionKey.Unauthorized });
        }
        // Do something with response error
        return Promise.reject(errorData);
    }
);

export default instance;

// const handleError = (error) => {
//     // CommonService.closeLoading();
//     if (error.status === 400) {
//         // this.logService.showError(ErrorHttpLanguageModels.errorCode400);
//     } else if (error.status === 401) {
//         if (error.statusText === 'Unauthorized') {
//             // this.logService.showError(ErrorHttpLanguageModels.errorCode500);
//         } else {
//             // this.logService.showError(error.error);
//         }

//     } else if (error.status === 403) {
//         // this.logService.showError(ErrorHttpLanguageModels.errorCode403);
//     } else if (error.status === 404) {
//         // this.logService.showError(ErrorHttpLanguageModels.errorCode404);
//     } else if (error.status === 405) {
//         // this.router.navigate(['/version-incorrect']);
//     } else if (error.status === 500) {
//         const resultData = error.error;
//         if (resultData.Error !== undefined) {
//             // this.logService.getErrorFeedback(new FeedbackViewModel(
//             //     resultData.Status, resultData.Error, resultData.StackTrace, resultData.ModelStateErrors));
//         }
//     } else {
//         // this.logService.showError(ErrorHttpLanguageModels.errorUnexpected);
//     }
//     // return throwError(error || ErrorHttpLanguageModels.errorServer);
// }
