import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config/config';

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  user: config.DB.USER,
  pass: config.DB.PASSWORD,
};
const { NODE_ENV } = process.env;
const uri = NODE_ENV === 'test' ? config.DB.URI_TEST : config.DB.URI;

mongoose.connect(uri, dbOptions);

const { connection } = mongoose;

connection.once('open', () => {
  console.log('Mongodb Connection stablished');
});

connection.on('error', (err) => {
  console.log('Mongodb connection error:', err);
  process.exit();
});
