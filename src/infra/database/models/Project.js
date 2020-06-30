export default (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    totalIssue: DataTypes.INTEGER,
    avgIssues: DataTypes.INTEGER,
    stdIssues: DataTypes.INTEGER,
    stars: DataTypes.STRING
  }, {});

  return Project;
};