module.exports = (sequelize, DataType) => {
    return sequelize.define('article', {
        id: {
            type: DataType.UUID,
            primaryKey: true,
            defaultValue: DataType.UUIDV1,
            allowNull: false
        },
        title: {
            type: DataType.STRING(32),
            allowNull: false
        },
        caption: {
            type: DataType.STRING(256),
            allowNull: false
        },
        thumb: {
            type: DataType.STRING(64),
            allowNull: false
        },
        html: {
            type: DataType.TEXT,
            allowNull: false
        },
        categoryId: {
            type: DataType.UUID,
            allowNull: false
        },
        visit: {
            type: DataType.INTEGER(10),
            allowNull: false,
            defaultValue: 0
        },
        like: {
            type: DataType.INTEGER(10),
            allowNull: false,
            defaultValue: 0
        },
        comment_count: {
            type: DataType.INTEGER(10),
            allowNull: false,
            defaultValue: 0
        }
    }, {
            freezeTableName: true
        })
}