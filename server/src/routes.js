const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
module.exports = (app) => {
  // User routes
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationController.login)
  // Songs routes
  app.get('/songs', SongsController.index)
  app.get('/songs/:songId', SongsController.show)
  app.put('/songs/:songId', SongsController.put)
  app.post('/songs', SongsController.post)
  // Bookmark routes
  app.get('/bookmark', BookmarksController.index)
  app.post('/bookmark', BookmarksController.post)
  app.delete('/bookmark/:bookmarkId', BookmarksController.delete)
}
