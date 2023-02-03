import Blog from '../../models/Blog'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        let getBlogs = await Blog.find()
        // let category = {}
        // for (let items of getBlogs){
        //     if (items.category in category){
        //         if (!category[items.category])
        //         category[items.category]
        //     }
        //     else{
        //         category[items.category] = JSON.parse(JSON.stringify(items))

        //     }
        // }
        // res.status(200).json({ category })
        res.status(200).json({ getBlogs })

    } else {
        res.status(405).json({ error: "Invalid request method" })
    }
}

export default connectDb(handler)
