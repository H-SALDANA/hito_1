import dotenv from 'dotenv';
import { Sequelize } from "sequelize-typescript";
import { User, Post} from "../models/user.model";
import { Pet } from "../models/pet.model";



dotenv.config();
const DATABASE_URL = process.env.CONNECT_DB

if (!DATABASE_URL) { 
  throw new Error("DATABASE_URL is not defined"); 
}

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  models: [User, Post, Pet],
  // logging: false, // disable logging
});

sequelize.sync()
 .then(() => console.log('synchronized models')) 
 .catch(err => console.error('error synchronized modles', err))