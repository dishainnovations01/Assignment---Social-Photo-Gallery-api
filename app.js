const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
require('dotenv/config')
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.raw());
const { runInNewContext } = require('vm')
var admin = require("firebase-admin");
var serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://badabhalu-8cfd8.firebaseio.com/",
  storageBucket: "gs://olib-ecf61.appspot.com"
});

//database conection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then(response => {
    console.log('Database Conectd Succesfully')
}).catch(err => {
    console.log('Database Conection Failed')
})
//database conection end

// middleware routes
const userRoute = require('./routes/user')
const photoGalleryRoute = require('./routes/photogallery')
const likeDisLikeRoute = require('./routes/likedimages')
// middleware routes end

//redirecting routes
app.use('/users', userRoute)
app.use('/photogallery',photoGalleryRoute)
app.use('/likedislike',likeDisLikeRoute)

app.get('/', (req, res) => res.send("Hello API!"))
app.listen(port, () => console.log(`Badabhalu app listening on port ${port}s!`))