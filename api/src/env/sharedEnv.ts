import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 4000;

export default {
  SERVER_PORT,
};
