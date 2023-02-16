import User from '../../../../models/User';
import Category from '../../../../models/Category';
import WithAuth from '../../withAuth';
import BlogForm from "../../../../components/adminComponents/BlogForm";
import connectDb from '../../../../middleware/mongoose';


const AdminAddBlog = ({ categories, users }) => {
  return <BlogForm initialValues={{}} mode="add" categories={categories} users={users}/>;
};
export async function getServerSideProps(context) {

  await connectDb();

  let categories = await Category.find();
  let user = await User.find();
  // console.log(categories)
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      users: JSON.parse(JSON.stringify(user)),
    },
  }
}
export default WithAuth(AdminAddBlog);




