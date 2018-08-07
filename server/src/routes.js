const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoryController = require('./controllers/HistoryController')
const isAuthenticated = require('./policies/isAuthenticated')
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
  app.get('/bookmark', isAuthenticated, BookmarksController.index)
  app.post('/bookmark', isAuthenticated, BookmarksController.post)
  app.delete('/bookmark/:bookmarkId', isAuthenticated, BookmarksController.delete)
  // History routes
  app.get('/history', isAuthenticated, HistoryController.index)
  app.post('/history', isAuthenticated, HistoryController.post)
}
