import 'reflect-metadata';
import express from 'express';

import { createConnection, Connection } from 'typeorm';

import {User} from './userEntity';

const app = express();

let connectSource:Connection;
(async ()=>{
  try{
    connectSource = await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'blog',
      entities:[User],
      synchronize: false,
    });
  }catch(err){
   console.log(err)
  }
})()


app.get('/', async (_req, res, _next) => {
  let userRepository = connectSource.getRepository(User);
  const resData = await userRepository.find();
  res.json({success: true, data: resData});
})

app.listen('9094', ()=>{
  console.log('runing port 9094');
})