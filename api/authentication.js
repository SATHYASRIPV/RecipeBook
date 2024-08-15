import jwt from 'jsonwebtoken'
import User from "./models/auth_model.js"
// const SECRET_KEY = process.env.SECRET_KEY


export const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' })
    }

    try {
        const decoded = jwt.verify(token,"welcome")
        // console.log(decoded);
        const user = await User.findById(decoded.user.id)
        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }
        next()
    } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'Token is not valid' })
    }
}