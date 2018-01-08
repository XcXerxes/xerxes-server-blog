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
      allowNull: false,
      validate: {
        len: [3, 15]
      }
    },
    password: {
      type: DataType.STRING(32),
      allowNull: false,
      validate: {
        len: [6, 15]
      }
    },
/*     confirm_password: {
      type: DataType.STRING(32),
      allowNull: false,
      validate: {
        len: [6, 15]
      }
    }, */
    client_ip: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        isIP: true
      }
    },
    avatar: {
      type: DataType.STRING(32),
      allowNull: false
    },
    xc_email: {
      type: DataType.STRING(32),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['username', 'xc_email']
      }
    ]
  })
}
