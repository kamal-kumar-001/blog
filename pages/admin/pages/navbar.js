import Layout from '../../../components/adminComponents/AdminLayout';
import Link from 'next/link';
import Router from 'next/router';

const NavItems = ({ navItems }) => {
  const handleDelete = async ( id) => {
    const res = await fetch(`/api/navApi?id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
  
    if (res.ok) {
      console.log(data.message);
      Router.push('/admin/pages/navbar');
    } else {
      console.error(data.message);
    }
  };
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Navbar</h1>
        <Link href="/admin/pages/add/addNav">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add NavItem
          </button>
        </Link>

        <div className='overflow-x-auto'>

        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">NavItems</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {navItems.map((nav) => (
              <tr key={nav._id}>
                <td className="border px-4 py-2">{nav.position}</td>
                <td className="border px-4 py-2">{nav.name}</td>
                <td className="border px-4 py-2">
                  {nav.slug}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    href="/admin/updateNav/[nav]" 
                    as={`/admin/updateNav/${nav._id}`}
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleDelete(nav._id)}
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
  // let baseUrl = process.env.URL
  let baseUrl = 'https://blog-jcxn.vercel.app/'
  const res = await fetch(`${baseUrl}/api/navApi`);
  const data = await res.json();
  return {
    props: {
      navItems: data.navItems,
    },
  };
}

export default NavItems;

