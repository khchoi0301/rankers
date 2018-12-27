const models = require('../models')

module.exports = () => {
  const options = {
    force: process.env.NODE_ENV === 'test' ? true : false
  }
  return models.sequelize.sync(options)  //force true 기존 DB를 날리고 새로 동기화
}