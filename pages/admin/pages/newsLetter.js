import React, { useState } from 'react';
import Layout from '../../../components/adminComponents/AdminLayout';
import WithAuth from '../withAuth';
import Link from 'next/link';
import RichEditor from '../../../components/adminComponents/RichEditor';

const SendEmailToAll = ({email}) => {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/sendEmailToAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailSubject, emailBody })
    });

    if (res.ok) {
      setMessage('Emails sent successfully');
    } else {
      setMessage('Failed to send emails');
    }
  };

  return (
    <Layout>
       <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Joined At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {email && email.map((email) => (
              <tr key={email._id}>
                <td className="border px-4 py-2">{email.name}</td>
                <td className="border px-4 py-2">
                  {email.email}
                </td>
                <td className="border px-4 py-2">
                  {email.createdAt}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    href="/admin/updateEmail/[email]" 
                    as={`/admin/updateEmail/${email._id}`}
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleDelete('emails', email._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  <form onSubmit={handleSubmit} className="flex flex-col">
  {message && <p className='text-green-500'>{message}</p>}
  <div className="flex gap-5 justify-between">
      <h1 className="text-2xl flex-1  font-bold mb-4">Send Newsletter</h1>
      {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
           <Link href={"/admin"}>Cancel</Link>
        </button> */}
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          type="submit"
        >
          Send
        </button>
        </div>
  <label htmlFor="subject">Subject:</label>
    <input type="text" id="subject"
            value={emailSubject}
            required
            onChange={e => setEmailSubject(e.target.value)} className="w-full px-3 py-2 mb-4 border border-gray-400 rounded-lg"  />
    <label htmlFor="body">Body:</label>
             <RichEditor content={emailBody} setContent={setEmailBody}/>
  </form>
 
    </Layout>
  );
};

export async function getServerSideProps(context) {
  let baseUrl = process.env.URL
  const res = await fetch(`${baseUrl}/api/emailApi`);
  const data = await res.json();
  return {
    props: {
      email: data.emails,
    },
  };
}

export default WithAuth(SendEmailToAll);

