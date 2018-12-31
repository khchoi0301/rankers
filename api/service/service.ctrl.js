const models = require('../../models/index')

const index = function (req, res) {
  req.query.limit = req.query.limit || 10
  const limit = parseInt(req.query.limit, 10)
  if (Number.isNaN(limit)) {
    return res.status(400).end()
  }

  models.Service
    .findAll({
      limit: limit
    })
    .then(services => {
      res.json(services)
    })
}

const show = (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) return res.status(400).end()

  models.Service
    .findOne({
      where: { id }
    })
    .then(service => {
      if (!service) return res.status(404).end();
      res.json(service)
    })
}

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) return res.status(400).end()

  models.Service
    .destroy({
      where: { id }
    })
    .then(() => {
      res.status(204).end()
    })
}

const create = (req, res) => {
  const service = req.body.service

  if (!service) return res.status(400).end()

  models.Service
    .create(req.body)
    .then(service => {
      res.status(201).json(service);
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).end()
      }
      res.status(500).end()
    })
}

const update = (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) return res.status(400).end()

  const service = req.body.service
  if (!service) return res.status(400).end()

  models.Service
    .findOne({ where: { id } })
    .then(service => {
      if (!service) return res.status(404).end()

      // console.log('service-before', service.dataValues)
      service.update(req.body)
        .then(service => {
          res.json(service)
        })
        .catch(err => {
          if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).end()
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