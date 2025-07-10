import { connect, connection } from 'mongoose';

const connectionString = process.env.ATLAS_URI;
const clientOptions = {
    dbName: 'todo-app',
    serverApi: { version: '1' as const, strict: true, deprecationErrors: true },
};

if (!connectionString) {
    throw new Error('Missing ATLAS_URI in environment variables');
}

const dbPromise = async () => {
    try {
        await connect(connectionString, clientOptions).then(() => {
            console.log('Database connected successfully');
            return connection;
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export default dbPromise;
