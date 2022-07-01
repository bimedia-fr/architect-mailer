# architect-mailer  [![NPM version](https://img.shields.io/npm/v/architect-mailer.svg)](https://www.npmjs.com/package/architect-mailer)

expose mailer service as architect plugin.

### Installation

```sh
npm install --save architect-mailer
```
### Config Format 

```js
{
  packagePath: 'architect-mailer',
  transport: {
    tls: {
        rejectUnauthorized: false,
    },
    ignoreTLS: true,
    secure: false,
    port: 25,
  },
  mail: {
    config1: {
        from : 'noreply@example.com',
    }
  }
}
```

### Usage

Boot [Architect](https://github.com/c9/architect) :

```js
var path = require('path');
var architect = require("architect");

var configPath = path.join(__dirname, "config.js");
var config = architect.loadConfig(configPath);

architect.createApp(config, function (err, app) {
    if (err) {
        throw err;
    }
    console.log("app ready");
});
```


And use the service in your app :

```js
module.exports = function setup(options, imports, register) {
    var mailer = imports.mailer;

    // send mail
    mailer.config1.sendMail({
        to: 'someone@example.com',
        subject: 'this the mail subject',
        html: '<p>html message</p>'
    }).then(() => {
        console.log('mail sent !');
    });
    
    register();
};
// Consume rest plugin
module.exports.consumes=['mailer'];
```



### Options
* tansport : see [nodemailer smtp](https://nodemailer.com/smtp/) or [nodemailer other transports](https://nodemailer.com/transports/)
* mail : a hash of configurations see nodemailer [message configuration](https://nodemailer.com/message/)
* throttle: add a delay in ms when mail is sent to prevent flooding transport. (default: 0)
