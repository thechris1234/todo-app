import express from 'express';
import './loadEnvironment';

import dbPromise from './utils/db/conn';
import userRoutes from './routes/user';
import taskRoutes from './routes/task';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

dbPromise().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
