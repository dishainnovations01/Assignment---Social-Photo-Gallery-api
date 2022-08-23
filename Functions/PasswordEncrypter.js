const fs = require("fs");
const bcrypt = require('bcrypt');
const { base64encode, base64decode } = require('nodejs-base64');

class PasswordEncrypterClass {
  
  static encrypt(password) {
    var encryptedPassword = base64encode(password)
    return encryptedPassword
  }


}
module.exports = PasswordEncrypterClass;
