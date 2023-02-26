import Layout from '../../../components/adminComponents/AdminLayout';
import Link from 'next/link';
import WithAuth from '../withAuth';

const ViewContact = ({ contact }) => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">All Contact Message</h1>
        <div className='overflow-x-auto'>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Reply</th>
            </tr>
          </thead>
          <tbody>
            {contact.map((contact) => (
              <tr key={contact._id}>
                <td className="border px-4 py-2">{contact.name}</td>
                <td className="border px-4 py-2">
                  {contact.email}
                </td>
                <td className="border px-4 py-2">
                  {contact.message}
                </td>
                <td className="border px-4 py-2">
                  {contact.createdAt}
                </td>
                <td className="border px-4 py-2">
                <Link
                    href="/admin/replyContact/[contact]" 
                    as={`/admin/replyContact/${contact._id}`}
                  >
                    <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                      Reply
                    </button>
                  </Link>
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

export async function getServerSideProps(context) {
  let baseUrl = process.env.URL
  const res = await fetch(`${baseUrl}/api/contactApi`);
  const data = await res.json();
  return {
    props: {
      contact: data.contact,
    },
  };
}

export default WithAuth(ViewContact);
