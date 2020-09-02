import 'reflect-metadata';

import path from 'path';

import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import bodyParser from 'body-parser';

import './database';

import uploadConfig from './config/upload.config';
import errorHandler from './middleware/errorHandler';

// Import routes file
import routes from './routes';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, 'config', 'config.env') });

const app = express();

// Body Parser
app.use(bodyParser.json());

app.use('/files', express.static(uploadConfig.directory));

// Mount routes
app.use('/api/v1', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3333;
const mode = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(colors.green.bold(`Server listening on port ${PORT}! [${mode}]`));
});
