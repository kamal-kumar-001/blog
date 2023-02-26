import Layout from '../../components/adminComponents/AdminLayout';
import Link from 'next/link';
import WithAuth from './withAuth';


const Admin = () => {
  
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Link href="/admin/pages/add/addBlog">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
            Add Blog
          </button>
        </Link>
        <Link href="/admin/pages/add/addCategory">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
            Add Category
          </button>
        </Link>
        <Link href="/admin/pages/add/addUser">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
            Add User
          </button>
        </Link>
        <Link href="/admin/pages/add/addNav">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add NavItem
          </button>
        </Link>
        <Link href="/admin/pages/add/addPage">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add Page
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default WithAuth(Admin);

