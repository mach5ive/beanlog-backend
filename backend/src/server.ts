import app from './app';
import {connectDB} from './utils/db'

const start = async () => {

  // console.log("URI:", process.env.MONGO_URI);

  connectDB();

  app.listen(4000, ()=>{
    console.log('Server is up.')
  })
}

start();