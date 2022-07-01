const assert = require('assert');
const mailer = require('../lib/index');

describe('architect-mailer', () => {
    describe('setup', () => {
        it('should create a distinct mail for each config', (done) => {
            mailer({
                transport:{},
                mail: {
                    config1: {
                        from: 'noreply@example.com'
                    },
                    config2: {
                        from: 'nowhere@example.com'
                    }
                }
            }, {}, (err, res) => {
                assert.ifError(err);
                assert.ok(res);
                assert.ok(res.mailer.config1)
                assert.strictEqual(typeof res.mailer.config1.sendMail, 'function');
                assert.ok(res.mailer.config2)
                assert.strictEqual(typeof res.mailer.config2.sendMail, 'function');
                done();
            });
        });
    });
});