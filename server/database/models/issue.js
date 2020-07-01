module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define('Issue', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    state: DataTypes.STRING,
    fixedTime: DataTypes.INTEGER,
    createdTime: DataTypes.DATE,
    closedTime: DataTypes.DATE
  }, {});

  Issue.associate = (models) => {
    Issue.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'Project',
      onDelete: 'CASCADE',
    });
  };

  return Issue;
};