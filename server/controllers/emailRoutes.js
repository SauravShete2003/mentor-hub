
import express from 'express';
import transporter from './mailer.js';
import gmailTemplate from './template.js';

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { to, subject, userName } = req.body;
  const { apikey } = req.headers;

  if (apikey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!to || !subject) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const mailOptions = {
    from: `"Mentor Hub" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: gmailTemplate.replace('###user###', userName),
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: 'Email sent successfully!',
      data: response,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

export default router;
