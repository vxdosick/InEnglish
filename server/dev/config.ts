import dotenv from 'dotenv';
dotenv.config();

export const MONGO = process.env.MONGO || "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6"
export const PORT = process.env.PORT || 3000