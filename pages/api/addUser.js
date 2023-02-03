import bcrypt from 'bcrypt'
import User from '../../models/User'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        await user.save()
        res.status(201).json({ success: "User added successfully" })
    } else {
        res.status(405).json({ error: "Invalid request method" })
    }
}

export default connectDb(handler)

// import User from '../../models/User'
// import connectDb from '../../middleware/mongoose'

// const handler = async (req, res) => {
//     if (req.method === 'POST') {
//         let user = new User({ 
//             name: req.body.name, 
//             email: req.body.email, 
//             password: req.body.password,
//         })
//         await user.save()
//         res.status(201).json({ success: "User added successfully" })
//     } else {
//         res.status(405).json({ error: "Invalid request method" })
//     }
// }

// export default connectDb(handler)
