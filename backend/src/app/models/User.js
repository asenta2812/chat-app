import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import ConstantValue from '../../config/values/constant-value';
import { generateToken } from '../../helpers/authentication';
import SystemMessage from '../../config/values/system-message';
import { createHash } from 'crypto';
const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        name: String,
        avatar: String,
        tokens: [
            {
                token: { type: String },
                refresh_token: { type: String },
            },
        ],
        conversations: [{ type: Schema.Types.ObjectId, ref: 'conversation' }],
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', function (next) {
    // Hash the password before saving the user model
    if (this.isModified('password')) {
        // gen salt to hash password
        const salt = bcrypt.genSaltSync(ConstantValue.SaltRound);

        // set password by hash password
        this.password = bcrypt.hashSync(this.password.trim(), salt);
    }

    // generate gravatar
    const sha512 = createHash('sha512').update(this.name).digest('hex');
    const size = 100;
    this.avatar = `https://gravatar.com/avatar/${sha512}?s=${size}&d=retro`;
    next();
});

userSchema.methods.generateTokens = async function () {
    const [token, refresh_token] = await Promise.all([
        generateToken(this),
        generateToken(this, true),
    ]);
    this.tokens = [...this.tokens, { token, refresh_token }];
    await this.save();
    return { token, refresh_token };
};

userSchema.statics.findCredential = async function ({ username, password }) {
    const user = await User.findOne({ username });
    // if user exists by username
    if (user) {
        const isCompare = bcrypt.compareSync(password, user.password);
        // if compare password = true
        if (isCompare) {
            // generate token and refresh_token from user
            const token = await user.generateTokens(); // token : {token: string, refresh_token: string}
            return {
                user: {
                    name: user.name,
                    username: user.username,
                    _id: user._id,
                },
                token,
            };
        }
        return { error: SystemMessage.UserNameOrPasswordInvalid };
    }
    return { error: SystemMessage.UserNotExists };
};
const User = model('user', userSchema);
export default User;
