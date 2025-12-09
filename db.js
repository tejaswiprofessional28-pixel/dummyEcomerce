import mongoose, { connect } from "mongoose";

const database = async () =>{
    try{
        await mongoose.connect('mongodb+srv://TejaswiMeshram:project@123@cluster0.dbdbua0.mongodb.net/?appName=Cluster0/dummyProductAdd');
        console.log('database is connected');
    }
    catch(e){
        console.log(e.message);
    }
}

export default database;