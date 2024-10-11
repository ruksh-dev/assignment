// necessary imports
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import configureStrategy from './utils/configureStrategy';
import {homeRoute} from './routes/home';
import {adminRoutes} from './routes/adminRoutes';
import {userRoutes} from './routes/userRoutes';
import {authRoutes} from './routes/authRoutes';
import {handlError} from './middlewares/errorHandler';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';

// Load enviornment variables
dotenv.config({path:path.resolve(__dirname,'../.env')})
const PORT=process.env.PORT;
const app=express();

// middlewares for parsin json files and cross-origin policy
app.use(express.json());
app.use(cors());

// configure session for storing login state in-memory
app.use( 
  session({ 
    resave: false, 
    saveUninitialized: false, 
    secret: process.env.SESSION_SECRET!, 
  }) 
); 

// Intialize passport google-oauth2-strategy
app.use(passport.initialize()) 
app.use(passport.session()); 
configureStrategy();

// all routes
app.use(homeRoute);
app.use(authRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use(handlError);

// start server
app.listen(PORT,()=>console.log('server running on port:'+PORT));
