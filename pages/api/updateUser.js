import User from '../../models/User';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
  if (req.method == 'POST') {
    let user = await  User.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json({ success: 'User updated successfully' });
  } else {
    res.status(405).json({ error: 'Invalid request method' });
  }
};

export default connectDb(handler);
