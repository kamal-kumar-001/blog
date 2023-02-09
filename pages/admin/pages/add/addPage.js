// import mongoose from 'mongoose'
import PageForm from '../../components/PageForm';
import WithAuth from '../../withAuth';
// import BlogForm from "../../components/BlogForm";
// import connectDb from '../../../../middleware/mongoose';
 const AdminAddPage = () => {
          return(
            <PageForm initialValues={{}} mode="add" />
          )
};
export default WithAuth(AdminAddPage);




