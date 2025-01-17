import { Sequelize } from "sequelize-typescript";
import { Post, User } from "../models/user.model";
import dotenv from 'dotenv';

dotenv.config();
const DATABASE_URL = process.env.CONNECT_DB

if (!DATABASE_URL) { 
  throw new Error("DATABASE_URL is not defined"); 
} 
export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  models: [User, Post],
  logging: false, // disable logging
});