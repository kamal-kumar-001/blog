import Layout from '../../../components/adminComponents/AdminLayout';
import Link from 'next/link';
import React  from 'react';
import User from '../../../models/User';
import Router from 'next/router';
import WithAuth from '../withAuth';
import connectDb from '../../../middleware/mongoose';

const Admin = ({ users }) => {
  const handleDelete = async (collection, id) => {
    const res = await fetch(`/api/deleteApi?collection=${collection}&id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
  
    if (res.ok) {
      console.log(data.message);
      Router.push('/admin/pages/users');
    } else {
      console.error(data.message);
    }
  };


  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <Link href="/admin/pages/add/addUser">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add User
          </button>
        </Link>
        <div className='overflow-x-auto'>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">
                  {user.email}
                </td>
                <td className="border px-4 py-2">
                  {user.createdAt}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    href="/admin/updateUser/[user]" 
                    as={`/admin/updateUser/${user._id}`}
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleDelete('users', user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context){
    await connectDb();
    let user = await User.find().sort({createdAt: -1});
   return {
      props: {
          users: JSON.parse(JSON.stringify(user)), 
      },
    }
}

export default WithAuth(Admin);

