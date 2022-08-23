const AUTHKEY = process.env.AUTHKEY || "a2lyYXllcGF5LXByb2plY3Q=";
const { base64encode, base64decode } = require('nodejs-base64');
const ErrorLog = require('../GlobalFunctions/ErrorLog');
const Customer = require('../models/Customer');
module.exports.checkAuthKey = async (req, res, next)  => {
    var USERID = req.body.customerId
    var SECONDKEY = req.body.secondKey
    var findCustomer = await Customer.findOne({_id: USERID})
    var errorlog = new ErrorLog()
    if (findCustomer) {
        if(findCustomer.authToken == SECONDKEY){
            var SUPERAUTHKEY = req.body.SUPERAUTHKEY
            var superkey = base64encode('astrongpasswordneededforbadabhaluencryptionandveryfication')
            var superykeynew = base64encode(superkey)+USERID
            var newsupernewkey = base64encode(superykeynew)+findCustomer.authToken
            if(newsupernewkey == SUPERAUTHKEY){
                next();
            }
            else {
                await errorlog.validationFailedFunction()
                res.status(401).send({ message: "unauthorised" });
            }
        }
        else {
            await errorlog.validationFailedFunction()
            res.status(401).send({ message: "unauthorised" });
        }
    } else {
        await errorlog.validationFailedFunction()
        res.status(401).send({ message: "unauthorised" });
    }
}