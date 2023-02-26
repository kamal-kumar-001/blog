import connectDb from '../../middleware/mongoose'
import Email from '../../models/Email';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        let emails = await Email.find().sort({ createdAt: -1 });
        res.status(200).json({  emails  })

    } else {
        res.status(405).json({ error: "Invalid request method" })
    }
}

export default connectDb(handler)
