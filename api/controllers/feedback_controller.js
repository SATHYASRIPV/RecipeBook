import User from "../models/auth_model.js"
import Feed from "../models/feedback_model.js"

export const Feedback = async (req,res) => {
    try {
        const userid = req.params.id
        const user = User.findById(userid)
        if (!user) res.status(404).json({ message: "User Not Found" })
            
        else {
            const { feedback } = req.body
            const newFeed = new Feed({
                feed: feedback,
                userid: userid
            })
            await newFeed.save()
            res.status(201).json({ message: "Feedback recieved successfully", feed: newFeed })
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" ,error: err.message})
    }
}

