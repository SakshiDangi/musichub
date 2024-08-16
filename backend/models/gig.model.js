import mongoose from "mongoose";

const gigSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String
    }],
    date:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    submission: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Submission',
        }
    ]
},{timestamps:true});
export const Gig = mongoose.model("Gig", gigSchema);