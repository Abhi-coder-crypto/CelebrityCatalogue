import mongoose from "mongoose";

let isConnected = false;

export async function connectToMongoDB() {
  if (isConnected) {
    return;
  }

  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log("✓ Connected to MongoDB successfully");
  } catch (error) {
    console.error("✗ Failed to connect to MongoDB:", error);
    throw error;
  }
}

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log("MongoDB disconnected");
});

mongoose.connection.on('error', (err) => {
  console.error("MongoDB connection error:", err);
});
