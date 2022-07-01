const nodemailer = require("nodemailer");

module.exports = function startup(config, imports, register) {
  let transporter = nodemailer.createTransport(config.transport);

  function getMailer(cfg) {
      return (opts) => {
        return new Promise((resolve, reject) => {
            let options = Object.assign({}, opts, cfg);
            transporter.sendMail(options, (err, res) => {
                if (err) {
                    return reject(err);
                }
                setTimeout(() => {
                    resolve(res);
                }, config.throttle || 0);
            });
        });
    };
  }

  let mailer = Object.keys(config.mail).reduce((prev, curr) => {
    prev[curr] = {
        sendMail: getMailer(config.mail[curr])
    };
    return prev;
  }, {});

  register(null, {
        mailer
    });
};

module.exports.provides = ["mailer"];
