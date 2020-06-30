export default (sequelize, DataTypes) => {
  const Issue = sequelize.define('Issue', {
    status: DataTypes.STRING,
    created: DataTypes.DATE
  }, {});

  Issue.associate = (models) => {
    Issue.belongsTo(models.Project, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE',
    });
  };

  return Issue;
};