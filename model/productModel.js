import mongoose from "mongoose";

const dummyProduct = new mongoose.Schema({
    
    productName :{
        type: String,
        required: true
    },
    productPrice : {
        type: String,
        required: true
    },
    imageUrl :{
        type: String,
        required: true
    }
})

const productModel = mongoose.model("products", dummyProduct);
export default productModel;