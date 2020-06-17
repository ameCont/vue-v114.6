const {Bookmark} = require('../models')
const { Op } = require('sequelize');

module.exports = {
  async index (req, res) {
    try {
      // console.log('aicii')
      const {songId, userId} = req.query
      console.log('songId: '+songId, 'userId '+userId)
      // const SongId = req.body.params.SongId
      // const UserId = req.body.params.UserId
      const bookmark = await Bookmark.findOne({
        where: {
          // SongId: SongId,
          UserId: userId
        }
      })

      // console.log('bookmark', bookmark)
      res.send(bookmark)
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
      console.log('songId ' +songId, 'userId '+userId)
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