import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true 
    },
    read: {
        type: Boolean,
        required:true
    },
    createdAt:{type:Number}
});

export const Dataset = mongoose.model("Dataset", datasetSchema);