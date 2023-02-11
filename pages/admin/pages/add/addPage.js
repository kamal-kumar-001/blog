import PageForm from '../../../../adminComponents/PageForm';
import WithAuth from '../../withAuth';
 const AdminAddPage = () => {
          return(
            <PageForm initialValues={{}} mode="add" />
          )
};
export default WithAuth(AdminAddPage);




