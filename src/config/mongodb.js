import mongoose from 'mongoose';
import dotEnv from 'dotenv';
dotEnv.config();

const CONNECTION_URL = (process.env.MONGO_CONNECTION_URL || 'mongodb://localhost:27017/test');

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
export default mongoose;