module.exports = (sequelize, DataType) => {
    return sequelize.define('user', {
        id: {
            type: DataType.UUID,
            primaryKey: true,
            defaultValue: DataType.UUIDV1,
            allowNull: false
        },
        username: {
            type: DataType.STRING(32),
            allowNull: false
        },
        password: {
            type: DataType.STRING(32),
            allowNull: false
        },
        role: {
            type: DataType.STRING(32),
            defaultValue: 'register',
            allowNull: false
        },  //权限
    }, {
            freezeTableName: true
        })
}