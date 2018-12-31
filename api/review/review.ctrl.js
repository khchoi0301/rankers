const models = require('../../models/index')

const index = function (req, res) {
  req.query.limit = req.query.limit || 10
  const limit = parseInt(req.query.limit, 10)
  if (Number.isNaN(limit)) {
    return res.status(400).end()
  }

  models.Review
    .findAll({ limit })
    .then(reviews => {
      res.json(reviews)
    })
    .catch((err) => {
      console.log(err)
    })
}

const show = (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) return res.status(400).end()

  models.Review
    .findOne({
      where: { id }
    })
    .then(review => {
      if (!review) return res.status(404).end();
      res.json(review)
    })
}

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) return res.status(400).end()

  models.Review
    .destroy({
      where: { id }
    })
    .then(() => {
      res.status(204).end()
    })
}

const create = (req, res) => {

  models.Review
    .create(req.body)
    .then(review => {
      res.status(201).json(review);
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(409).end()
      }
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).end()
      }
      res.status(500).end()
    })
}

const update = (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) return res.status(400).end()

  models.Review
    .findOne({ where: { id } })
    .then(review => {
      if (!review) return res.status(404).end()

      // console.log('review-before', review.dataValues)
      review.update(req.body)
        .then(review => {
          // console.log('review-after', review.dataValues)
          res.json(review)
        })
        .catch(err => {
          if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(409).end()
          }
          if (err.name === 'SequelizeValidationError') {
            return res.status(400).end()
          }
          res.status(500).end()
        })
    })
}

module.exports = {
  index,
  show,
  destroy,
  create,
  update
}