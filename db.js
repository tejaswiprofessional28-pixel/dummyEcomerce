import mongoose, { connect } from "mongoose";

const database = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/dummyProductAdd');
        console.log('database is connected');
    }
    catch(e){
        console.log(e.message);
    }
}

export default database;