import mongoose, { connect } from "mongoose";
import dotenv from 'dotenv';
const database = async () =>{
    try{
        await mongoose.connect(process.env.DB);
        console.log('database is connected');
    }
    catch(e){
        console.log(e.message);
    }
}

export default database;