import Product from '../../models/shop/Product'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let product = new Product({
            title: req.body.title,
            slug: req.body.slug,
            content: req.body.content,
            img: req.body.img,
            price: req.body.price,
        })
        await product.save()
        res.status(201).json({ success: "Product added successfully" })
    } else {
        res.status(405).json({ error: "Invalid request method" })
    }
}

export default connectDb(handler)
