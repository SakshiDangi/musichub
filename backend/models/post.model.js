import mongoose from "mongoose";
import { type } from "os";

const postSchema = new mongoose.Schema(
    {
        epkId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        comment: [
            {
                type: String,
                created: { type: Date, default: Date.now },
                postedBy: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
    },
    { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);