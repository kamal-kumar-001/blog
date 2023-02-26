import Page from "../../models/Page";
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const pages = await Page.find({}).sort({ position: 1 });
                res.status(200).json({ pages: pages });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case "POST":
            try {
                const Page = await new Page({
                    position: req.body.position,
                    name: req.body.name,
                    slug: req.body.slug,
                    subitems: req.body.subitems || [],
                    // subitems: req.body.subitems,
                }).save();
                // console.log(Page);
                res.status(200).json({ message: 'Created successfully' });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case "PUT":
            try {
                const { id } = req.query;
                const Page = await Page.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!Page) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ data: Page });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case "DELETE":
            try {
                const { id } = req.query;
                const deletedPage = await Page.findByIdAndDelete(id);
                if (!deletedPage) {
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
