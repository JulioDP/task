import express from 'express';
import cookieParser from 'cookie-parser';
import routerAuthentication from './router/userAuthentication.js';
import { config } from './config/config.js';
import { validarJson  } from './middleware/validarJson.js';
const app = express();  
app.use(express.json()); 
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.use('/authentication', validarJson, routerAuthentication);

app.listen(config.port, ()=>{
    console.log("welcome", config.port);
})