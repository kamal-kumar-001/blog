import Blog from '../../models/Blog';

export default async (req, res) => {
  const totalViews = await Blog.aggregate([
    {
      $group: {
        _id: null,
        totalViews: {
          $sum: '$views'
        }
      }
    }
  ]);

  res.status(200).json({ totalViews });
};
