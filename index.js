import express from 'express'
import productRouter from "./src/routes/productRoute.js";
import userRouter from "./src/routes/userRoute.js";
import { config } from 'dotenv';
import db from './src/config/db.js';
import cookieParser from 'cookie-parser'
import morgan from 'morgan';
import cors from 'cors';

const app = express()
const port = 3000

config();
db();

app.use(cors())
app.use(express.static('public'))
app.use(express.static('assets'))
app.use(cookieParser())
app.use(express.json());
app.use(morgan('dev'));

app.get('/',
(request, response) => {
  response.send("This is Hello World!")
})

app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})