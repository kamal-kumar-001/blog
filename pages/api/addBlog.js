import Blog from '../../models/Blog'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let blog = new Blog({
            title: req.body.title,
            slug: req.body.slug,
            metaContent: req.body.metaContent,
            content: req.body.content,
            img: req.body.img,
            user: req.body.user,
            category: req.body.category,
        })
        await blog.save()
        res.status(201).json({ success: "Blog added successfully" })
    } else {
        res.status(405).json({ error: "Invalid request method" })
    }
}

export default connectDb(handler)
