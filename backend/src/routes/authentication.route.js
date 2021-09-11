import { Router } from 'express';
import AuthenticationController from '../app/controllers/AuthenticationController';
const router = Router();

const auth = new AuthenticationController();

// [POST] /user/signin
router.post('/signin', auth.signIn);

// [POST] /user/signup
router.post('/signup', auth.signUp);

// [GET] /user/me/
router.get('/me', auth.getMe);

// [GET] /user/logout
router.get('/logout', auth.logout);

// [GET] /user/logout
router.get('/logout-all', auth.logoutAll);

// [POST] /user/refresh-token
router.post('/refresh-token', auth.refreshToken);

// [GET] /user/all-contact
router.get('/all-contact', auth.getAllContact);


// [GET] /user/get-user/:id
router.get('/get-user/:id', auth.getUserById);


export default router;
