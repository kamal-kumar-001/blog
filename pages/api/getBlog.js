import Blog from '../../models/Blog'
import Category from '../../models/Category'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        let getBlogs = await Blog.find().populate('user').populate('category').sort({ createdAt: -1 });
        let categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json({ getBlogs, categories })

    } else {
        res.status(405).json({ error: "Invalid request method" })
    }
}

export default connectDb(handler)
