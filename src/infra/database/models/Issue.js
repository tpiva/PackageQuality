export default (sequelize, DataTypes) => {
  const Issue = sequelize.define('Issue', {
    status: DataTypes.STRING,
    created: DataTypes.DATE
  }, {});

  return Issue;
};