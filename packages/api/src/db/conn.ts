import { MongoClient, Db } from 'mongodb';

const connectionString = process.env.ATLAS_URI || '';
const client = new MongoClient(connectionString);

const dbPromise = client
    .connect()
    .then((conn) => conn.db('accounts'))
    .finally(() => console.log('Database connected successfully'))
    .catch((e) => {
        console.error(e);
        throw e;
    });

export default dbPromise;
