import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    gig:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gig',
        required: true
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    },
},{timestamps:true});

export const Submission = mongoose.model("Submission", submissionSchema);