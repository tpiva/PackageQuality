module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    totalIssues: DataTypes.INTEGER,
    avgTimeIssue: DataTypes.INTEGER,
    stdTimeIssue: DataTypes.INTEGER
  }, {});

  project.associate = (models) => {
    project.hasMany(models.Issue, {
      foreignKey: 'projectId',
      as: 'issues',
      onDelete: 'CASCADE',
    });
  };

  return project;
};