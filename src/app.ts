import express from 'express';
import bodyParser from 'body-parser';

import todosRoutes from './routes/todos';

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use(todosRoutes);

app.listen(port);
