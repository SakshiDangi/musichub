import { Submission } from "../models/submission.model.js";
import { Gig } from "../models/gig.model.js";

export const applyGig = async (req, res) => {
    try {
        const userId = req.id;
        const gigId = req.params.id;
        if (!gigId) {
            return res.status(400).json({
                message: "Gig id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Submission.findOne({ gig: gigId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this gig",
                success: false
            });
        }

        // check if the gigs exists
        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res.status(404).json({
                message: "Gig not found",
                success: false
            })
        }
        // create a new application
        const newSubmission = await Submission.create({
            gig:gigId,
            applicant:userId,
        });

        gig.submission.push(newSubmission._id);
        await gig.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getSubmitedGig = async (req,res) => {
    try {
        const userId = req.id;
        const submission = await Submission.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'gig',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!submission){
            return res.status(404).json({
                message:"Not Submitted!",
                success:false
            })
        };
        return res.status(200).json({
            submission,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const gigId = req.params.id;
        const gig = await Gig.findById(gigId).populate({
            path:'submission',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!gig){
            return res.status(404).json({
                message:'Gig not found.',
                success:false
            })
        };
        return res.status(200).json({
            gig, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const submissionId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicant id
        const submission = await Submission.findOne({_id:submissionId});
        if(!submission){
            return res.status(404).json({
                message:"Submission not found.",
                success:false
            })
        };

        // update the status
        submission.status = status.toLowerCase();
        await submission.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}