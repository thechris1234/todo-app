import express from 'express';

import './loadEnvironment';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
