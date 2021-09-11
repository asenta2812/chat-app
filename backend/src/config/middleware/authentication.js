import User from '../../app/models/User';
import { verifyToken } from '../../helpers/authentication';
import ErrorHandler from '../../helpers/error';
import StatusCode from '../values/status-code';

export default async function isAuth(req, res, next) {
    if (req.url.includes('signin') || req.url.includes('signup')) {
        return next();
    }
    const token = req.headers['authentication']?.replace('Bearer ', '');
    if (token) {
        try {
            const { data } = await verifyToken(token);
            if (data) {
                const currentUser = await User.findOne({
                    _id: data._id,
                    'tokens.token': token,
                });
                if (currentUser) {
                    req.user = currentUser;
                    req.token = token;
                    next();
                } else {
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
        } catch (err) {
            const error = new ErrorHandler(
                StatusCode.Unauthorized,
                err.message
            );
            next(error);
        }
    } else {
        const error = new ErrorHandler(
            StatusCode.Unauthorized,
            'No token provided.'
        );
        next(error);
    }
}
