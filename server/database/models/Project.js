export default (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    totalIssue: DataTypes.INTEGER,
    avgIssues: DataTypes.INTEGER,
    stdIssues: DataTypes.INTEGER,
    stars: DataTypes.STRING
  }, {});

  Project.associate = (models) => {
    Project.hasMany(models.Issue, {
      foreignKey: 'projectId',
      as: 'issues',
      onDelete: 'CASCADE',
    });
  };

  return Project;
};