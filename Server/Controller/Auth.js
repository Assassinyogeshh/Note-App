import UserAuth from "../Model/AuthSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config({ path: "./.env" });

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;


        const ExistingUserDetails = await UserAuth.findOne({ email });

        //Check User
        if (!ExistingUserDetails) {

            return res.status(404).json({ message: "User Not Found" });

        }

        //No Empty Field

        if (!email || !password) {
            return res.status.json({ message: "Empty filled cant be accept" })
        }

        // comparing the give password
        const checkPassword = await bcrypt.compare(password, ExistingUserDetails.password);

        if (!checkPassword) {
            return res.status(404).json("Invalid Credentials");
        }


        // create token everyTime user Login
        const createToken = jwt.sign({ email: ExistingUserDetails.email, id: ExistingUserDetails._id }, process.env.SECRET_KEY, { expiresIn: "1h" });


        return res.status(200).json({ message: "User Successfully Login", token: createToken, data:ExistingUserDetails })



    } catch (error) {

        console.log("Login Error:", error);

        return res.status(500).json("Login Failed")

    }
}


export const register = async (req, res) => {
    try {

        // getting value from the users
        const { name, email, password, Cpassword } = req.body

        if (!name || !email || !password || !Cpassword) {
            res.status(404).json("Please Give The Required Details")
        }

        const existingUserDetails = await UserAuth.findOne({ email });

        if (existingUserDetails) {

            return res.status(409).json("User Already Exist");

        }

        if (password != Cpassword) {

            return res.status(400).json("Password And Confirm Should Match");

        }

        //secure password with hash
        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = await UserAuth.create({ name, email, password: hashPassword, Cpassword: hashPassword });

        console.log("new User:", newUser);

        return res.status(200).json("User Successfully Registered");

    } catch (error) {

        console.log("Registered Error:", error);

        return res.status(500).json("Something Went Wrong")
    }
}