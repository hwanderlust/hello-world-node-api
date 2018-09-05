const ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {
  const userCollection = db.collection('users')

  app.post('/users', (req, res) => {
    let user = { username: req.body.username.toLowerCase() }

    userCollection.findOne(user, (err, item) => {
      if(err) {
        return console.log(err);

      } else if(item) {
        return res.send({ 'warning': 'username already taken :(' })

      } else {
        user = { ...user, password: req.body.password };

        userCollection.insertOne(user, (err, result) => {
          if(err) {
            res.send({ 'error': 'an error has occured' })

          } else {
            const userInfo = result.ops[0]

            user = {}
            for(const key in userInfo) {
              if(key !== 'password') {
                user[key] = userInfo[key]
              }
            }

            console.log(user);
            res.send(user)
          }
        })
      }
    })
  });

  app.get('/users', (req, res) => {
    userCollection.find({}).toArray((err, users) => {
      console.log('found users', users);
      res.send(users)
    })
  })

  app.get('/users/username/:username', (req, res) => {
    console.log('users/:username');
    const username = req.params.username
    const details = { 'username': username }

    userCollection.findOne(details, (err, item) => {
      if(err) {
        res.send({ 'error': 'an error has occured' })
      } else {
        res.send(item)
      }
    })
  })

  app.get('/users/id/:id', (req, res) => {
    console.log('users/:id');
    const id = req.params.id
    const details = { '_id': new ObjectID(id) }

    userCollection.findOne(details, (err, item) => {
      if(err) {
        res.send({ 'error': 'an error has occured' })
      } else {
        res.send(item)
      }
    })
  })

  app.patch('/users/:id', (req, res) => {
    const id = req.params.id
    const details = { '_id': new ObjectID(id) }
    const user = { username: req.body.username, password: req.body.password }

    userCollection.updateOne(details,{ $set: user }, (err, item) => {
      if(err) {
        res.send({ 'error': 'an error has occured' })
      } else {
        res.send(item)
      }
    })
  })

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id
    const details = {'_id': new ObjectID(id) }

    userCollection.deleteOne(details, (err, item) => {
      if(err) {
        res.send({ 'error': 'an error has occured '})
      } else {
        res.send('User' + id + 'deleted');
      }
    })
  })

}
