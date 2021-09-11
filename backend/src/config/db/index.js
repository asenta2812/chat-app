import { connect } from 'mongoose';

export default async function connectDatabase() {
    try {
        await connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Connect succeed');
    } catch {
        console.log('Connect fail');
    }
}

