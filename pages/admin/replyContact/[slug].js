import React, { useState } from 'react';
import Layout from '../../../components/adminComponents/AdminLayout';
import WithAuth from '../withAuth';
import RichEditor from '../../../components/adminComponents/RichEditor';

const ReplyToContact = ({contact}) => {
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [message, setMessage] = useState('');
    const [to, setTo] = useState(contact.email);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/replyApi', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              to,
              emailSubject: emailSubject,
              emailBody: emailBody,
            })
          });
        if (res.ok) {
            setMessage('Email sent successfully');
        } else {
            setMessage('Failed to send email');
        }
    };



    return (
        <Layout>
            <form onSubmit={handleSubmit} className="flex flex-col">
                {message && <p>{message}</p>}
                <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          type="submit"
        >
          Send
        </button>
                <label htmlFor="subject">To</label>
                <input type="text" id="subject"
                    value={to}
                    required
                    onChange={(e) => setTo(e.target.value)} className="w-full px-3 py-2 mb-4 border border-gray-400 rounded-lg" />
                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject"
                    value={emailSubject}
                    required
                    onChange={(e) => setEmailSubject(e.target.value)} className="w-full px-3 py-2 mb-4 border border-gray-400 rounded-lg" />
                <label htmlFor="body">Body:</label>
                {/* <textarea type="text" id="body"
                    value={emailBody}
                    rows="5"
                    required
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full px-3 py-2 mb-4 border border-gray-400 rounded-lg" /> */}
                    <RichEditor content={emailBody} setContent={setEmailBody} />
                {/* <button type="submit" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Send</button> */}
            </form>
        </Layout>
    );
};
export async function getServerSideProps({ params }) {
  const { slug } = params;
  const baseUrl = process.env.URL;
  const res = await fetch(`${baseUrl}/api/contact/${slug}`);
  const contact = await res.json();

  return {
    props: {
      contact: contact,
    },
  };
}
export default WithAuth(ReplyToContact);
