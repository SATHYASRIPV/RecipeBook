import User from "../models/auth_model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


export const Signup = async(req,res) => {
    const { username, password, email } = req.body

    const crypted = bcryptjs.hashSync(password,10)
    const newuser = new User({ username, password: crypted, email })
    // if (User.findOne({ email: email })===null) { alert({ message: "User already exist..." })  }
    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }
        await newuser.save()
        res.status(201).json({ message: "user created Successfully" })
    } catch(error) {
        console.log(error)
    }
}

export const Signin = async (req, res) => {
    const { email, password } = req.body;
    const SECRET_KEY = "welcome";
    
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        // console.log(user)
        const token = jwt.sign({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
        }, SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({ 'token':token, 'user':user });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
};

export const Users = async (req, res) => {
    const users = await User.find({})
    try {
        return res.status(200).json(users)
    }
    catch (error) {
        res.status(500).send(error)
    }
}