const nodemailer = require("nodemailer");

module.exports = function startup(c, imports, register) {
  let config = Object.assign({transport: {}, mail: {}}, c);
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
      onDestroy: function (callback) {
          transporter.close(callback);
      },
      mailer
  });
};

module.exports.provides = ["mailer"];
