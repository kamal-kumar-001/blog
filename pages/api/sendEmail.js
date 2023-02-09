import nodemailer from 'nodemailer';
import Email from '../../models/Email'

export default async (req, res) => {

    if (req.method === 'POST') {
      // Save email and name to MongoDB
      let email = new Email({
        name: req.body.name,
        email: req.body.email,
      })
      await email.save()
  
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "kkhatiwal1@gmail.com",
          pass: "rsjlyzyuvcpjscxd"
        }
        // host: 'email-smtp.us-east-1.amazonaws.com',
        // port: 587,
        // secure: false, // true for 465, false for other ports
        // auth: {
        //   user: "AKIA4E3QV3SIJPX53K2E",
        //   pass: "BPiqiO5nXgQWhZBUZh7u6sYt0OHlM5VoBJ7Oo+W02yn7"
        // }
      });
  
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" kkhatiwal1@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
      });
  
      // console.log('Message sent: %s', info.messageId);
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
      res.status(200).json({ success: "Email sent successfully and saved in the database" });
    } else {
      res.status(405).json({ error: "Invalid request method" });
    }
  };
  