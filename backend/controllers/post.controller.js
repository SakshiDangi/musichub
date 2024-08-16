import { Post } from "../models/post.model.js";

//add comment
// export const addComment = async (req, res) => {
//     const { comment } = req.body;
//     const epkId = req.params.body;
//     try {
//         const postComment = await Post.findByIdAndUpdate(req.params.id, {
//             $push: { comments: { text: comment, postedBy: req.user.epkId } }
//         },
//             { new: true }
//         );
//         const post = await Post.findById(postComment.epkId).populate('comments.postedBy', 'name email');
//         res.status(200).json({
//             success: true,
//             post
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }



export const addComment = async (req, res) => {
    try {
        const {  } = req.body;
        if (!comments) {
            return res.status(400).json({
                message: "comment box name is required.",
                success: false
            });
        }
        let company = await Post.findOne({ comment: comments });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            Comment: comments,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// export const updateCompany = async (req, res) => {
//     try {
//         const { name, description, website, location } = req.body;
//         const file = req.file;
//         // idhar cloudinary ayega

    
//         const updateData = { name, description, website, location };

//         const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found.",
//                 success: false
//             })
//         }
//         return res.status(200).json({
//             message:"Company information updated.",
//             success:true
//         })

//     } catch (error) {
//         console.log(error);
//     }
// }