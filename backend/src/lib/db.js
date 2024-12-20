import mongoose from "mongoose";

export const connectDB = async () => {
   if (!process.env.MONGODB_URI) {
      console.error("No MONGODB_URI environment variable provided.");
      process.exit(1);
   }

   try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`Connected to MongoDB: ${conn.connection.host}`);
   } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      process.exit(1);
   }
};
