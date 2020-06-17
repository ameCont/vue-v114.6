const {History,
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
      const histories = await History.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history))
      // console.log('bookmark', bookmark)
      res.send(_.uniqBy(histories, history => history.SongId))
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the history'
      })
    }
  },
  async post (req, res) {
    try {
      console.log('aici')
      const {songId, userId} = req.body
      console.log('POST songId ' +songId, 'userId '+userId)

      const history = await History.create({
        SongId: songId,
        UserId: userId
      })
      console.log(history)
      res.send(history)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the history'
      })
    }
  }
}