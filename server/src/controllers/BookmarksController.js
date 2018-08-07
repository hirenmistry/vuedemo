const {Bookmark} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const {songid, userid} = req.query
      const bookmark = await Bookmark.findOne({
        where: {
          songId: songid,
          userId: userid
        }
      })
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch bookmarks'
      })
    }
  },
  async post (req, res) {
    try {
      const {songid, userid} = req.body.params
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songid,
          UserId: userid
        }
      })
      if (bookmark) {
        res.status(400).send({
          error: 'You already have bookmarked this song'
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songid,
        UserId: userid
      })
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create bookmark'
      })
    }
  },
  async delete (req, res) {
    try {
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findById(bookmarkId)
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete bookmark', details: err
      })
    }
  }
}
