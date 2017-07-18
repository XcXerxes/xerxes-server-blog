module.exports = (sequelize, DataType) => {
  return sequelize.define('admin', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataType.UUIDV1
    },
    username: {
      type: DataType.STRING(32),
      allowNull: false
    },
    password: {
      type: DataType.STRING(64),
    },
    role: {
      type: DataType.STRING(32)
    }
  }, {
      freezeTableName: true
    })
}