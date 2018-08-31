
const somethin = require('./secrets');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/contactMe', (req, res, next) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${somethin.idk}`,
      pass: `${somethin.nothin}`
    }
  });
  const mailOptions = {
    from: `${req.body.userEmail}`,
    to: `${somethin.idk}`,
    subject: "CONTACT FROM PERSONAL SITE",
    html: `
      Message from some dear developer friend named ${req.body.userName},<br>
      They said:<br>
      <br>
      ${req.body.userMessage}
      <br>
      `
  };
  transporter.sendMail(mailOptions, function(err, info){
    if(err){
      next(err);
    } else {
      console.log('info: ',info);
      res.sendStatus(200);
    }
  })

})

// Error handler
app.use((err, req, res, next ) => {
  // err = err || new Error("Internal Server Error");
  if (err) { console.log(err)}
  res.status( err.status || 500);
  res.json({ error: err.message });
});
app.listen(3333, () => {
  console.log('listening on http://localhost:3333');
});
