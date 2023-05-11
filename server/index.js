import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoute from './routes/posts.js';
import dalleRoute from './routes/dalle.js';

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json({limit:'50mb'}));

app.get('/',async(req,res)=>{
    res.status(200).json({
        message:'Welcome from DALL.E!',
    });
});

app.use('/api/v1/post',postRoute);
app.use('/api/v1/dalle',dalleRoute);

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => {
            console.log('Server started on port 8080')
        });
    } catch(error) {
        console.log(error);
    }
};

startServer();
