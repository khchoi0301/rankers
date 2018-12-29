module.exports = (sequelize, Sequelize) => (
  sequelize.define('User',
    {
      email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true
      },
      password: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      provider: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      snsId: {
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