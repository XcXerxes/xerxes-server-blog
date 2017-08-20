module.exports = (sequelize, DataType) => {
  return sequelize.define('frontUser', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV1,
      allowNull: false
    },
    username: {
      type: DataType.STRING(16),
      allowNull: false
    },
    password: {
      type: DataType.STRING(64),
      allowNull: false
    },
    xc_email: {
      type: DataType.STRING(32),
      allowNull: false
    }
  }, {
    freezeTableName: true
  })
}