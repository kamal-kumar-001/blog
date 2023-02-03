import nodemailer from 'nodemailer';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    if (!req.body.to) {
      return res.status(400).json({ message: 'No recipients defined' });
    }
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'kkhatiwal1@gmail.com', // generated ethereal user
        pass: 'rsjlyzyuvcpjscxd' // generated ethereal password
      }
    });
    
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" kkhatiwal1@gmail.com', // sender address
      to: req.body.to, // list of receivers
      subject: req.body.emailSubject, // Subject line
      text: req.body.emailBody, // plain text body
      html: `<p>${req.body.emailBody}</p>` // html body
    });
    
    // console.log(info);
    
    // Return success message
    res.status(200).json({ message: 'Reply sent successfully' });
  } else {
    // Return error for invalid request method
    res.status(400).json({ message: 'Invalid request method' });
  }
};

module.exports = handler;