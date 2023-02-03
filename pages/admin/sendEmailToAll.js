import React, { useState } from 'react';
import Layout from './components/AdminLayout';
import WithAuth from './withAuth';

const SendEmailToAll = () => {
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
  <form onSubmit={handleSubmit} className="flex flex-col">
  {message && <p>{message}</p>}
  <label htmlFor="subject">Subject:</label>
    <input type="text" id="subject"
            value={emailSubject}
            required
            onChange={e => setEmailSubject(e.target.value)} className="w-full px-3 py-2 mb-4 border border-gray-400 rounded-lg"  />
    <label htmlFor="body">Body:</label>
    <textarea type="text" id="body"
            value={emailBody}
            rows="5"
            required
            onChange={e => setEmailBody(e.target.value)}
             className="w-full px-3 py-2 mb-4 border border-gray-400 rounded-lg"  />
    <button type="submit" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Send</button>
  </form>
    </Layout>
  );
};

export default WithAuth(SendEmailToAll);

