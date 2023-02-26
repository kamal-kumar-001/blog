import connectDb from '../../middleware/mongoose'
import User from '../../models/User';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        let users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({  users  })

    } else {
        res.status(405).json({ error: "Invalid request method" })
    }
}

export default connectDb(handler)
