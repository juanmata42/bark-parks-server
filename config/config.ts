import dotenv from 'dotenv';

dotenv.config();

export default {
  jwtSecret: process.env.JWT_SECRET || 'secrettoken',
  DB: {
    URI:
      process.env.MONGODB_URI ||
      'mongodb+srv://juanmaisdi:isdifinal@cluster0.m480r.mongodb.net/BarkParksDB?retryWrites=true&w=majority',
    USER: process.env.MONGODB_USER || 'juanmaisdi',
    PASSWORD: process.env.MONGODB_PASSWORD || 'isdifinal',
    URI_TEST:
      process.env.MONGODB_URI_TEST ||
      'mongodb+srv://juanmaisdi:isdifinal@cluster0.m480r.mongodb.net/BarkParksDBTest?retryWrites=true&w=majority',
  },
};
