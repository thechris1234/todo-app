import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import './loadEnvironment';

import dbPromise from './utils/db/conn';
import userRoutes from './routes/user';
import taskRoutes from './routes/task';
import { initI18n } from '@todoapp/shared/localization';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);
app.use(express.json());

initI18n();

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

dbPromise().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
