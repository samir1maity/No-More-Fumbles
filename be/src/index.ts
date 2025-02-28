import express from "express";
import 'dotenv/config'
import { generateResponse } from "./config/gemini";


const PORT = process.env.PORT || "3000";

console.log('PORT', PORT)

const app = express();

const response =  generateResponse("i have 5 years of experience in node js and i want to be a react developer");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
