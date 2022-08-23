const AUTHKEY = process.env.AUTHKEY || "a2lyYXllcGF5LXByb2plY3Q=";
const { base64encode, base64decode } = require('nodejs-base64');

module.exports.checkAuthKey = (req, res, next) => {
    // var SUPERAUTHKEY = req.body.SUPERAUTHKEY
    // var superkey = base64encode('hey dude')
    // if (req.body.AUTHKEY === AUTHKEY) {
        next();
    // } else {
    //     res.status(401).send({ message: "unauthorised" });
    // }
}