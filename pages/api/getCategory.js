import Category from '../../models/Category'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        let categorys = await Category.find()
        res.status(200).json({ categorys })
    } else {
        res.status(405).json({ error: "Invalid request method" })
    }
}

export default connectDb(handler)
