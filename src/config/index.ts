import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const config = {
  app: {
    name: process.env.APP_NAME || 'app',
    port: process.env.PORT || 3000,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  password: {
    salt: process.env.PASSWORD_SALT,
  }
};
