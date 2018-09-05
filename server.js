const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const f = require('util').format;
const db = require('./config/db')
const app = express();

const port = 8000;
const dbName = 'hello-world-node-api'
const authMechanism = 'DEFAULT';

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, {useNewUrlParser: true}, (err, client) => {
  const db = client.db(dbName)

  if(err) return console.log(err);

  app.post('/login', (req, res) => {
    console.log('hit server login');
    const authUser = db.auth('username', 'password')
    console.log(authUser);
  })

  require('./app/routes')(app, db);

  app.listen(port, () => {
    console.log('we are listening on port ' + port);
  })
})
