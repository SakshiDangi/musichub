import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum:['artist','recruiter'],
        required: true
    },
    profile: {
        bio:{type: String},
        skills:[{type:String}],
        resume:{type:String},  //url to resume file
        resumeOriginalName:{type:String},
        profilePic:{
            type:String,
            default:""
        },
        coverPic:{
            type:String,
            default:""
        },
        socialLinks:[{type:String}],
        streamingData:[{
            streamName:{type:String},
            streamLink:{type:String}  //link of streaming website
        }],
        bandPic:[{
            type:String
        }],
        videos:[{type:String}],
        createdAt:{type:Number},
        updatedAt:{type:Number}
    },
},{timestamps:true});
export const User = mongoose.model('User', userSchema);