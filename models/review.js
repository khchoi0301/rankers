module.exports = (sequelize, Sequelize) => (
  sequelize.define('Review',
    {
      title: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      contents: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      stars: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      img: {
        type: Sequelize.STRING(40),
        allowNull: true
      }
    }, {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }))
