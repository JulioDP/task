import express from 'express';
import { homePage } from '../controllers/home.js';

const routerHome =  express.Router();
routerHome.get('/', homePage);

export default routerHome