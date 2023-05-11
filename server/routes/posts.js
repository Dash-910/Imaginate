import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import Post from'../mongodb/models/post.js';
import cors from 'cors';

dotenv.config();
const router = express.Router();
router.use(
    cors()
  );
  

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});
// Create a Post and upload it to cloud
router.route('/').post(async(req,res)=>{
    try{
        const {name,prompt,photo} = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            prompt,
            photo:photoUrl.url,
        });
        res.status(200).json({success:true,data:newPost});
    }catch(error){
        res.status(500).json({sucess:false,meassage:"Unable to create post,please try again"});
    }
});

// Get all Posts

router.route('/').get(async(req,res)=>{
    try{
        const posts = await Post.find({});
        res.status(200).json({sucess:true,data:posts});
    }catch(error)
    {
        res.status(500).json({succes:false,message:"Fetching of posts failed, please try again"});
    }
})

export default router;

