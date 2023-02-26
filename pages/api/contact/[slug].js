import connectDb from '../../../middleware/mongoose';
import Contact from '../../../models/Contact';

export default async function handler(req, res) {
  await connectDb();
  const { slug } = req.query;
  const contact = await Contact.findOne({ _id: slug });

  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  return res.status(200).json(contact);
}
