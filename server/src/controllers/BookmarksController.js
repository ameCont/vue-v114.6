const {
  Bookmark,
  Song,
  User
} = require('../models')
const { Op } = require('sequelize');
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      console.log('aicii')
      const {songId, userId} = req.query
      //const {SongId} = req.query

      //const songId = req.query.params.songId
      //const userId = req.query.params.userId
      console.log('INDEXX songId: '+songId, 'userId '+userId)
      const where = {
        UserId: userId
      }

      if (songId) {
        where.SongId = songId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend(
          {},
          bookmark.Song,
          bookmark))
      // console.log('bookmark', bookmark)
      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the bookmarks'
      })
    }
  },
  async post (req, res) {
    try {
      console.log('aici')
      const {songId, userId} = req.body
      console.log('POST songId ' +songId, 'userId '+userId)
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      // console.log(bookmark)
      if (bookmark) {
        return res.status(400).send({
          error: 'You already have set this as a bookmark'
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      console.log(newBookmark)
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the bookmark'
      })
    }
  },
  async delete (req, res) {
    try {
      const {bookmarkId} = req.params
      console.log('DELETE', bookmarkId)
      const bookmark = await Bookmark.findByPk(bookmarkId)
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete the bookmark'
      })
    }
  }
}