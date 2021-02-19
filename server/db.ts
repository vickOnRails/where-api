import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const connString = process.env.MONGO_URI as string;
    const conn = await mongoose.connect(connString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
