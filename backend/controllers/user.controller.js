import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {name, email, phoneNumber, password, role} = req.body;
        if(!name || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:'Please fill all details carefully',
                success: false 
            });
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:'User already exist plese login or register with another account.',
                success:false,
            })  
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            phoneNumber,
            password:hashedPassword,
            role, 
        });
        return res.status(201).json({
            message:"Account created successfully.",
            success: true 
        });
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Something is missing",
                success: false 
            });
        };
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                message: "Email or Password is Incorrect",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Password is Incorrect",
                success: false 
            });
        };
        // role of the user is correct or not
        if(role !== user.role){
            return res.status(400).json({
                message:"Account does not exist.",
                success: false
            })
        };

        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d' });

        user = {
            _id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly:true, sameSite: 'strict' }).json({
            message:`Welcome back ${user.name}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message:"Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {name, email, phoneNumber, bio, skills,} = req.body;
        
        const file = req.file;

        // cloudinary files came here......


        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; //middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message:"User not found",
                success: false 
            });
        };
      /////updating data
        if(name) user.name = name
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        // resume and video pic added here.......

        await user.save();

        user = {
            _id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}