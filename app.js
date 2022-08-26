const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 4000
require('dotenv/config')
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.raw());
const { runInNewContext } = require('vm')
var admin = require("firebase-admin");
var serviceAccount = require("./firebase.json");
const WebSocketServer = require('ws');
const server = require('http').createServer(app);

// Creating a new websocket server
const wss = new WebSocketServer.Server({ server:server });
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://badabhalu-8cfd8.firebaseio.com/",
  storageBucket: "gs://olib-ecf61.appspot.com"
});

wss.on("connection", ws => {
  console.log("new client connected");
  // sending message
  ws.on('message', function incoming(message) {

    wss.clients.forEach(function each(client) {
        client.send(JSON.parse(JSON.stringify(message.toString())));
    });
    
  });
  

  // handling what to do when clients disconnects from server
  ws.on("close", () => {
      console.log("the client has connected");
  });
  // handling client connection error
  ws.onerror = function () {
      console.log("Some Error occurred")
  }
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
app.use(express.static('../Uploads/'));


app.get('/', (req, res) => res.send("Hello API!"))
server.listen(8081, () => console.log(`Lisening on port :8081`))

app.listen(port, () => console.log(`Badabhalu app listening on port ${port}s!`))