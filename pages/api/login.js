import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../../models/User'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(400).json({ error: "Invalid email or password" })
        } else {
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (isMatch) {
                const token = jwt.sign({ user }, 'secret' , { expiresIn: '24h' })
                // localStorage.setItem('token', token)
                res.status(200).json({ success: "User logged in successfully", token })
            } else {
                res.status(400).json({ error: "Invalid email or password" })
            }
        }
    } else {
        res.status(405).json({ error: "Invalid request method" })
    }
}

export default connectDb(handler)



