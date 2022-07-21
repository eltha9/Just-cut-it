const nodemailler = require("nodemailer");

const MAILLER_CONFIG = {
  from: "",
  host: "",
  fromName: "",
  port: 1,
  secure: false,
  mailSubject: "",
};

async function sender(mail, options) {
  let transporter = nodemailler.createTransport({
    host: MAILLER_CONFIG.host,
    port: MAILLER_CONFIG.port,
    secure: MAILLER_CONFIG.secure,
  });

  let info = await transporter.sendMail({
    from: `${MAILLER_CONFIG.fromName} <${MAILLER_CONFIG.from}>`,
    to: mail,
    subject: MAILLER_CONFIG.mailSubject,
    text: options.text,
  });

  console.log(mail, options);
}

module.exports = {
  send(mail, options) {
    sender(mail, options).catch(console.error);
  },
};
