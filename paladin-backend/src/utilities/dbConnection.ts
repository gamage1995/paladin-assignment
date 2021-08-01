import mongoose from 'mongoose';

export async function connectToDb(uri: string | undefined) {
  if(!uri){
    throw new Error('enviroment variable undefined : DBURI');
  }
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    console.log('mongodb connection succesfull');
  } catch (error) {
    console.log(error);
  }
}