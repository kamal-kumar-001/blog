import Contact from '../../models/Contact'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        })
        await contact.save()
        res.status(201).json({ success: "Thank You for Contacting Us" })
    } else {
        res.status(405).json({ error: "Invalid request method" })
    }
}

export default connectDb(handler)
