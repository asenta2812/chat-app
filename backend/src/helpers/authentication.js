import { Promise } from 'bluebird';
import jwt from 'jsonwebtoken';
const tokenKey = process.env.JWT_TOKEN_KEY || '@CHAT_APP_TOKEN_NODEJS';
const expiredIn = process.env.JWT_TOKEN_EXPIRED_IN || '86400000';
const refreshTokenKey =
    process.env.JWT_REFRESH_TOKEN_KEY || '@CHAT_APP_REFRESH_TOKEN_NODEJS';
const expiredInRefreshTokenKey =
    process.env.JWT_REFRESH_TOKEN_EXPIRED_IN || '604800000';

export function generateToken(user, isRefreshToken = false) {
    return new Promise(function (resolve, reject) {
        const exp = isRefreshToken ? expiredInRefreshTokenKey : expiredIn;
        const key = isRefreshToken ? refreshTokenKey : tokenKey;
        jwt.sign(
            {
                data: {
                    _id: user._id,
                    name: user.name,
                    username: user.username
                },
            },
            key,
            {
                expiresIn: exp,
            },
            (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token);
            }
        );
    });
}
export function verifyToken(token, isRefreshToken = false) {
    const key = isRefreshToken ? refreshTokenKey : tokenKey;
    return new Promise(function (resolve, reject) {
        jwt.verify(token, key, (err, decode) => {
            if (err) {
                reject(err);
            }
            resolve(decode);
        });
    });
}
