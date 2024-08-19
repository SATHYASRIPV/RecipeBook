import jwt from 'jsonwebtoken'
import User from "./models/auth_model.js"
// const SECRET_KEY = process.env.SECRET_KEY
// import useAxiosInterceptors from '../frontend/src/components/AxiosInterceptor.jsx'


export const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);

    try {
        const decoded = jwt.verify(token,"welcome")
        // console.log(decoded);
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