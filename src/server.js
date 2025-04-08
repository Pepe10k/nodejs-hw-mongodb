import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUIExpress from 'swagger-ui-express';
import path from 'node:path';
import fs from 'node:fs';
import contactsRouter from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import authRouter from './routers/auth.js';

dotenv.config();

const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve('docs', 'swagger.json'), 'utf-8'),
  );

  app.use(cors());
  app.use(pino());
  app.use(express.json());
  app.use(cookieParser());

  app.use(
    '/api-docs',
    (req, res, next) => {
      console.log('Request for Swagger UI received');
      next();
    },
    swaggerUIExpress.serve,
    swaggerUIExpress.setup(swaggerDocument),
  );

  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
  });

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    const localUrl = `http://localhost:${PORT}`;
    console.log(`Server is running on port ${PORT}`);
    console.log(`You can access the API documentation at ${localUrl}/api-docs`);
  });
};

export default setupServer;