import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({path:path.resolve(__dirname,'../../.env')});

// connect to monogDB using mongoose 
mongoose.connect(process.env.DB_URI!)
    .then(()=>console.log('db connected'))
    .catch(err=>console.log('db NOT connected:'+err))

// user schema definition
const userSchema=new mongoose.Schema({
    _id: {type:String, required: true},
    username: {type:String, required: true},
    email: {type:String, required: true}
});

// admin schema definition
const adminSchema=new mongoose.Schema({
    _id: {type:String, required: true},
    adminname: {type:String, required: true},
    email: {type: String, required: true}
});

// admin schema definition
const assignmentSchema=new mongoose.Schema({
    userId: {type: String, required: true},
    task: {type: String, required: true},
    admin: {type: String, required: true},
    isAccepted: {type: String, default: 'pending'},
    submitTime: {type: String, required: true}
});

// export corressponding models
export const User=mongoose.model('User',userSchema);
export const Admin=mongoose.model('Admin',adminSchema);
export const Assignment=mongoose.model('Assignment',assignmentSchema);

// fix date, uploading of assingment by first validating admin
