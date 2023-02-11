import React, { useState } from 'react';
import Layout from '../../../adminComponents/AdminLayout';
import WithAuth from '../withAuth';
import connectDb from '../../../middleware/mongoose';
import Contact from '../../../models/Contact';

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
                <textarea type="text" id="body"
                    value={emailBody}
                    rows="5"
                    required
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full px-3 py-2 mb-4 border border-gray-400 rounded-lg" />
                <button type="submit" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Send</button>
            </form>
        </Layout>
    );
};
export async function getServerSideProps({ query }) {
    await connectDb();
    const contact = await Contact.findOne({ _id: query.slug });
    return {
      props: {
        contact: JSON.parse(JSON.stringify(contact)),
      },
    };
  }
export default WithAuth(ReplyToContact);
