var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const MongoClient = require('mongodb').MongoClient;

// const MONGO_URL = 'mongodb://<potato>:<tomato>@ds151508.mlab.com:51508/node-demo';

// MongoClient.connect(MONGO_URL, (err, db) => {  
//   if (err) {
//     return console.log(err);
//   }

//   // Do something with db here, like inserting a record
//   db.collection('notes').insertOne(
//     {
//       title: 'Hello MongoDB',
//       text: 'Hopefully this works!'
//     },
//     function (err, res) {
//       if (err) {
//         db.close();
//         return console.log(err);
//       }
//       // Success
//       db.close();
//     }
//   )
// });

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://potato:tomato@ds151508.mlab.com:51508/node-demo');

var nameSchema = new mongoose.Schema({
 firstName: String,
 lastName: String
});

var User = mongoose.model("User", nameSchema);

app.post("/addname", (req, res) => {
 var myData = new User(req.body);
 myData.save()
 .then(item => {
 res.send("Item saved to database");
 })
 .catch(err => {
 res.status(400).send("Unable to save to database");
 });
});

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});