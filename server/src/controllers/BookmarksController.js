const {Bookmark, Song} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userid = req.user.id
      const {songid} = req.query
      const where = {
        userId: userid
      }
      if (songid) {
        where.songId = songid
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [{
          model: Song
        }]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend({},
          bookmark.Song,
          bookmark
        ))
      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch bookmarks'
      })
    }
  },
  async post (req, res) {
    try {
      const userid = req.user.id
      const {songid} = req.body.params
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
      const userid = req.user.id
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          userId: userid
        }
      })
      if (!bookmark) {
        res.status(403).send({error: 'You do not have permission to access this resource'})
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete bookmark', details: err
      })
    }
  }
}
