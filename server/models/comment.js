module.exports = (sequelize, DataType) => {
    return sequelize.define('comment', {
        id: {
            type: DataType.UUID,
            primaryKey: true,
            defaultValue: DataType.UUIDV1,
            allowNull: false
        },
        articleId: {
            type: DataType.UUID,
            allowNull: false
        },
        userId: {
            type: DataType.UUID,
            allowNull: false
        },
        content: {
            type: DataType.TEXT,
            allowNull: false
        }
    }, {
            freezeTableName: true
        })
}