import mongoose, { mongo } from "mongoose";

const connectDB = (url)=>{
    mongoose.set('strictQuery',true);
    mongoose.connect(url)
        .then(()=>console.log('connected to mongo'))
        .catch((error)=>{
            console.error('failed to connect with mongo');
            console.error(error);
        });
};

export default connectDB;