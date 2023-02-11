import Blog from '../../models/Blog';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
  if (req.method == 'POST') {
    let blog = await  Blog.findByIdAndUpdate(req.body._id, req.body);
    // console.log(req.body._id);
    res.status(200).json({ success: 'Blog updated successfully' });
  } else {
    res.status(405).json({ error: 'Invalid request method' });
  }
};

export default connectDb(handler);
