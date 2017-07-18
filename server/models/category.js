module.exports = (sequelize, DataType) => {
    return sequelize.define('category', {
        id: {
            type: DataType.UUID,
            primaryKey: true,
            defaultValue: DataType.UUIDV1,
            allowNull: false
        },
        cate_name: {
            type: DataType.STRING(32),
            allowNull: false
        },
        cate_sort: {
            type: DataType.INTEGER(8),
            allowNull: false
        }
    }, {
            freezeTableName: true
        })
}