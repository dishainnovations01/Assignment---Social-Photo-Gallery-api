const fs = require("fs");
var admin = require("firebase-admin");

var bucket = admin.storage().bucket();
var baseimageurl = "../Uploads/"
class UploaderClass {
  
  static async uploadFile(image) {
    const base64String = image;
    var imageBuffer = new Buffer.from(
      base64String.replace(/^data:image\/\w+;base64,/, ""),"base64"
    );
    var extensionname = base64String.substring(
      "data:image/".length,
      base64String.indexOf(";base64")
    );
    var filename = baseimageurl + Math.floor(100000 + Math.random() * 900000) + Date.now() + "." + extensionname;
    fs.writeFileSync(filename, imageBuffer);
    return filename;
  }

 

  static async uploadFileList(imageList) {
    var multimediaList = [];
    for (let base64String of imageList) {
      var imageBuffer = new Buffer.from(
        base64String.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      var extensionname = base64String.substring(
        "data:image/".length,
        base64String.indexOf(";base64")
      );
      var filename =
        Math.floor(100000 + Math.random() * 900000) +
        Date.now() +
        "." +
        extensionname;
      fs.writeFileSync(baseimageurl+filename, imageBuffer);
      multimediaList.push(filename);
  
    }
    return multimediaList;
  }


  async uploadFilesDirect(imageList) {
    var multimediaList = [];
    for (let base64String of imageList) {
      var imageBuffer = new Buffer.from(
        base64String.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      var extensionname = base64String.image.substring(
        "data:image/".length,
        base64String.image.indexOf(";base64")
      );
      var filename = base64String.imagename

      fs.writeFileSync(baseimageurl+filename, imageBuffer);
      multimediaList.push(filename);
      // uncoment for firbase image upload
      // const metadata = {
      //   metadata: { firebaseStorageDownloadTokens: "sfsdfsd" },
      //   contentType: "image/" + extensionname,
      //   cacheControl: "public, max-age=31536000",
      // };
      // await bucket.upload(filename, {
      //   gzip: true,
      //   metadata: metadata,
      // });

      
      fs.unlinkSync(filename);
    }
    return multimediaList;
  }
}
module.exports = UploaderClass;
