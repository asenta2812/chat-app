import { model, Schema } from 'mongoose';

const conversationSchema = new Schema(
    {
        name: String,
        participantIds: { type: Array },
        participants: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'user',
                    required: true,
                },
                nickname: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default model('conversation', conversationSchema);
