import Category from '../../models/Category'
import Blog from '../../models/Blog'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        let categories = await Category.aggregate([
            {
                $lookup: {
                    from: 'blogs',
                    localField: '_id',
                    foreignField: 'category',
                    as: 'blogs',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    postCount: { $size: '$blogs' },
                },
            },
        ])

        res.status(200).json({ categories })
    } else {
        res.status(405).json({ error: "Invalid request method" })
    }
}

export default connectDb(handler)
