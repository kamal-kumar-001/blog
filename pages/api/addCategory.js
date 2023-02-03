import Category from '../../models/Category'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let category = new Category({
            name: req.body.name,
            slug: req.body.slug
        })
        await category.save()
        res.status(201).json({ success: "Category added successfully" })
    } else {
        res.status(405).json({ error: "Invalid request method" })
    }
}

export default connectDb(handler)
