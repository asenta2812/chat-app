import routerAuth from './authentication.route';
import { Router } from 'express';
import { throwError } from '../helpers/error';
import StatusCode from '../config/values/status-code';
import isAuth from '../config/middleware/authentication';
import routerChat from './chat.route';
/**
 * Config router
 * @param app = express()
 */
export default (app) => {
    const router = Router();
    const apiPrefix = process.env.API_PREFIX || '/api/v1/';

    app.use(isAuth);

    // use router Authentication
    router.use('/user', routerAuth);
    // use router chat
    router.use('/chat', routerChat);

    // use prefix before router
    app.use(apiPrefix, router);

    // not found
    // app.get('*', function (req, res) {
    //     throwError({statusCode : StatusCode.NotFound, message: 'Route not found'});
    // });
};
