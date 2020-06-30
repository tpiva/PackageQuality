import { DataTypes, Model } from 'sequelize';

class Project extends Model {
  
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      totalIssue: DataTypes.INTEGER,
      avgIssues: DataTypes.INTEGER,
      stdIssues: DataTypes.INTEGER,
      stars: DataTypes.STRING
    }, {
      sequelize
    });
  }
}

export default Project;