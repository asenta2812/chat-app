import User from '../models/User';
import SystemMessage from '../../config/values/system-message';
import validation from '../../helpers/validation';
import { generateToken, verifyToken } from '../../helpers/authentication';
export async function signUp({ username, password, name }) {
    const errorMessage = validateUserNameAndPassword(username, password);

    if (errorMessage) {
        return { error: errorMessage };
    }

    // check duplicate
    const userDuplicate = await User.findOne({ username });
    if (userDuplicate) {
        return { error: SystemMessage.UserNameUnique };
    }

    //save user
    const userCreate = await User.create({
        username,
        password,
        name,
    });
    return { data: userCreate };
}
export async function signIn({ username, password }) {
    const errorMessage = validateUserNameAndPassword(username, password);

    if (errorMessage) {
        return { error: errorMessage };
    }

    const { error, user, token } = await User.findCredential({
        username,
        password,
    });
    if (!error) {
        return { user, token };
    }

    return { error };
}

export async function logout(user, token) {
    user.tokens = user.tokens.filter((tk) => tk.token !== token);
    await user.save();
}
export async function logoutAll(user) {
    user.tokens = [];
    await user.save();
}
export async function refreshToken({ refresh_token }, user) {
    if (validation.isNullOrEmpty(refresh_token)) {
        return { error: SystemMessage.RefreshTokenRequired };
    }
    const dataDecode = await verifyToken(refresh_token, true);

    // check expired
    if (Date.now() > dataDecode.exp * 1000) {
        return { error: SystemMessage.RefreshTokenExpired };
    }

    // find token in current user ( local )
    const currentToken = user.tokens.find(
        (tk) => tk.refresh_token === refresh_token
    );
    if (!currentToken) {
        return { error: SystemMessage.RefreshTokenNotExists };
    }

    // change token in current user with current token
    currentToken.token = await generateToken(user);

    // save to db
    await user.save();
    return { token: currentToken.token, refresh_token };
}
export async function getAllContact(currentUser) {
    let listContacts = await User.find({ _id: { $ne: currentUser._id } });

    listContacts =
        listContacts &&
        listContacts.map((item) => ({
            _id: item._id,
            name: item.name,
            avatar: item.avatar,
        }));
    return { contacts: listContacts };
}
export async function getUserById(userId) {
    const user = await User.findOne(
        { _id: userId },
        '_id name avatar'
    );
    return { user };
}
function validateUserNameAndPassword(username, password) {
    if (validation.isNullOrEmpty(username)) {
        return SystemMessage.UserNameRequired;
    }
    if (validation.isNullOrEmpty(password)) {
        return SystemMessage.PasswordRequired;
    }
    return '';
}
