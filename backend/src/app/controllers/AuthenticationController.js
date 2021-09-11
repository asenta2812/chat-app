import StatusCode from '../../config/values/status-code';
import { throwError } from '../../helpers/error';
import * as authenticationService from '../services/AuthenticationService';
export default class AuthenticationController {
    /**
     * [POST] /user/signin
     * @param req  = {username, password}
     * @param res  = user data with token
     * Handle user sign in
     */
    async signIn(req, res, next) {
        try {
            const result = await authenticationService.signIn(req.body);

            if (result.error) {
                throwError({
                    message: result.error,
                    statusCode: StatusCode.BadRequest,
                });
            }

            res.bodyResponse = result;


            next();
        } catch (err) {
            next(err);
        }
    }

    /**
     * [POST] /user/signup
     * @param req  = {username, password}
     * @param res  = status or error
     * Handle user sign up
     */
    async signUp(req, res, next) {
        try {
            const result = await authenticationService.signUp(req.body);

            if (result.error) {
                throwError({
                    message: result.error,
                    statusCode: StatusCode.BadRequest,
                });
            }
            res.bodyResponse = result;
            req.io.emit('newUserSignUp', result);

            next();
        } catch (err) {
            next(err);
        }
    }

    /**
     * [GET] /user/me/:id
     * @param req  = userId
     * @param res  = userData
     * Handle user sign up
     */
    getMe(req, res, next) {
        const user = req.user;
        res.bodyResponse = {
            user: {
                _id: user._id,
                username: user.username,
                name: user.name,
                avatar: user.avatar,
            },
            // password: user.password,
        };
        next();
    }

    /**
     * [GET] /user/logout
     * @param req  = request
     * @param res  = response
     * Handle user logout
     */
    async logout(req, res, next) {
        try {
            res.bodyResponse = await authenticationService.logout(
                req.user,
                req.token
            );

            next();
        } catch (err) {
            next(err);
        }
    }
    /**
     * [GET] /user/logout-all
     * @param req  = request
     * @param res  = response
     * Handle user logout all
     */
    async logoutAll(req, res, next) {
        try {
            res.bodyResponse = await authenticationService.logoutAll(req.user);
            next();
        } catch (err) {
            next(err);
        }
    }

    /**
     * [POST] /user/refresh-token
     * @param req  = request
     * @param res  = response
     * Handle user logout all
     */
    async refreshToken(req, res, next) {
        try {
            res.bodyResponse = await authenticationService.refreshToken(
                req.body,
                req.user
            );
            next();
        } catch (err) {
            next(err);
        }
    }

    /**
     * [GET] /user/all-contact
     * @param req  = request
     * @param res  = response
     * Get all contact from db, except current user
     */
    async getAllContact(req, res, next) {
        try {
            res.bodyResponse = await authenticationService.getAllContact(
                req.user
            );
            next();
        } catch (err) {
            next(err);
        }
    }

    /**
     * [GET] /user/get-user/:id
     * @param req  = request
     * @param res  = response
     * Get info user by id    */
    async getUserById(req, res, next) {
        try {
            res.bodyResponse = await authenticationService.getUserById(
                req.params.id
            );
            next();
        } catch (err) {
            next(err);
        }
    }
}
