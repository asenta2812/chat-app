import { model, Schema } from 'mongoose';

const messageSchemage = new Schema(
    {
        senderId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
        type: String,
        content: String,
        url: String,
        conversationId: { type: Schema.Types.ObjectId, ref: 'conversation', required: true },
    },
    {
        timestamps: true,
    }
);
export default model('message', messageSchemage);
