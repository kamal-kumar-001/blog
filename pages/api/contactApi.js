import Contact from '../../models/Contact'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const contact = await Contact.find({}).sort({ createdAt: -1 });
                res.status(200).json({ contact: contact });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case "POST":
            try {
                const contact = await new Contact({
                    name: req.body.name,
            email: req.body.email,
            message: req.body.message,
                }).save();
                res.status(200).json({ success: "Thank You for Contacting Us" });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "DELETE":
            try {
                const { id } = req.query;
                const deletedContact = await Contact.findByIdAndDelete(id);
                if (!deletedContact) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ message: "Deleted Successfully" });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
export default connectDb(handler)

