const userRoutes = require('./user_routes');
const chatRoutes = require('./chat_routes');
const messageRoutes = require('./message_routes');

module.exports = function(app, db) {
  userRoutes(app, db),
  chatRoutes(app, db),
  messageRoutes(app, db)
}
