const nodemailer = require("nodemailer");

module.exports = function startup(config, imports, register) {
  let transporter = nodemailer.createTransport(config.transport);

  register(null, {
        mailer: {
            sendMail: (opts) => {
                return new Promise((resolve, reject) => {
                    let options = Object.assign({}, opts, config.mail);
                    transporter.sendMail(options, (err, res) => {
                        if (err) {
                            return reject(err);
                        }
                        setTimeout(() => {
                            resolve(res);
                        }, config.throttle || 0);
                    });
                });
            }
        }
    });
};

module.exports.provides = ["mailer"];
