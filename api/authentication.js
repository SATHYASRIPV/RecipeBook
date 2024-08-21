import jwt from 'jsonwebtoken'
import User from "./models/auth_model.js"



export const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);

    try {
        const decoded = jwt.verify(token,"welcome")
        const user = await User.findById(decoded.user.id)
        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }
        next()
    } catch (err) {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                
                return res.status(401).json({ message: 'Token expired.' });
            }
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }
    }
}