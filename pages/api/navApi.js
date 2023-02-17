import NavItem from "../../models/NavItem";
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const navItems = await NavItem.find({}).sort({ position: 1 });
                res.status(200).json({ navItems: navItems });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case "POST":
            try {
                const navItem = await new NavItem({
                    position: req.body.position,
                    name: req.body.name,
                    slug: req.body.slug,
                    subitems: req.body.subitems || [],
                    // subitems: req.body.subitems,
                }).save();
                // console.log(navItem);
                res.status(200).json({ message: 'Created successfully' });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case "PUT":
            try {
                const { id } = req.query;
                const navItem = await NavItem.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!navItem) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ data: navItem });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case "DELETE":
            try {
                const { id } = req.query;
                const deletedNavItem = await NavItem.findByIdAndDelete(id);
                if (!deletedNavItem) {
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
