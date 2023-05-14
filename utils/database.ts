import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async (): Promise<boolean> => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
        dbName: "AIme"
    });
    isConnected = true;
    console.log('MongoDB is connected');
    return isConnected;
  } catch (error) {
    console.log(error);
    return false;
  }
};
