import nodemailer from 'nodemailer';
import Email from '../../models/Email';

export default async (req, res) => {
    if (req.method === 'POST') {
        // Fetch all email addresses from the database
        const emailAddresses = await Email.find({});

        // Create a reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'kkhatiwal1@gmail.com',
                pass: 'rsjlyzyuvcpjscxd',
            },
        });


        // // Send email to all email addresses in the list
        // let info = await transporter.sendMail({
        //   from: '"Fred Foo 👻" kkhatiwal1@gmail.com',
        //   to: emailList,
        //   subject: req.body.emailSubject,
        //   text: req.body.emailBody,
        //   html: req.body.emailBody,
        // });

        // Loop through all email addresses and send email to each address
        for (const emailAddress of emailAddresses) {
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" kkhatiwal1@gmail.com',
                to: emailAddress.email,
                subject: req.body.emailSubject,
                text: req.body.emailBody,
                html: req.body.emailBody,
            });
        }

        res.status(200).send('Emails sent to all users');
    } else {
        res.status(405).json({ error: 'Invalid request method' });
    }
};



