import { Gig } from "../models/gig.model.js";
import { Submission } from "../models/submission.model.js";
// admin post krega job
export const postGig = async (req, res) => {
    try {
        const { title, description, requirements, date, location, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !date || !location || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const gig = await Gig.create({
            title,
            description,
            requirements: requirements.split(","),
            date,
            location,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            gig,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllGig = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const gigs = await Gig.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!gigs) {
            return res.status(404).json({
                message: "Gigs not found.",
                success: false
            })
        };
        return res.status(200).json({
            gigs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getGigById = async (req, res) => {
    try {
        const gigId = req.params.id;
        const gig = await Gig.findById(gigId).populate({
            path:"submission"
        });
        if (!gig) {
            return res.status(404).json({
                message: "Gigs not found.",
                success: false
            })
        };
        return res.status(200).json({ gig, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminGig = async (req, res) => {
    try {
        const adminId = req.id;
        const gigs = await Gig.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt:-1     
        });
        if (!gigs) {
            return res.status(404).json({
                message: "Gigs not found.",
                success: false
            })
        };
        return res.status(200).json({
            gigs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}