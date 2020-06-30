import { DataTypes, Model } from 'sequelize';

class Issue extends Model {
  
  static init(sequelize) {
    super.init({
      status: DataTypes.STRING,
      created: DataTypes.DATE
    }, {
      sequelize
    });
  }
}

export default Issue;