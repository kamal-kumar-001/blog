import WithAuth from '../../withAuth';
import BlogForm from "../../../../components/adminComponents/BlogForm";


const AdminAddBlog = ({ categories, users }) => {
  return <BlogForm initialValues={{}} mode="add" categories={categories} users={users}/>;
};
export async function getServerSideProps(context) {
  const baseUrl = process.env.URL
  const catRes = await fetch(`${baseUrl}/api/getCategory`);
  const categoryData = await catRes.json();
  const res = await fetch(`${baseUrl}/api/getUser`);
  const data = await res.json();
  // console.log(catRes)
  return {
    props: {
      categories: categoryData.categories,
      users: data.users,
    },
  }
}
export default WithAuth(AdminAddBlog);


