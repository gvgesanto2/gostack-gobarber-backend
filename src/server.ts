import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import bodyParser from 'body-parser';

// Import routes file
import routes from './routes';

// Load env vars
dotenv.config({ path: '../config/config.env ' });

const app = express();

// Body Parser
app.use(bodyParser.json());

// Mount routes
app.use('/api/v1', routes);

const PORT = process.env.PORT || 3333;
const mode = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(colors.green.bold(`Server listening on port ${PORT}! [${mode}]`));
});
