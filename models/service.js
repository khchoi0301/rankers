module.exports = (sequelize, Sequelize) => (
  sequelize.define('Service',
    {
      service: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true
      },
      location: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      profile: {
        type: Sequelize.STRING(40),
        allowNull: true
      }
    }, {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }))
