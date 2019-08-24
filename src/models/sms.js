'use strict';
module.exports = (sequelize, DataTypes) => {
  const sms = sequelize.define('sms', {
    message: DataTypes.STRING,
    sender: DataTypes.STRING,
    receiver: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  sms.associate = function(models) {
    // associations can be defined here
  };
  return sms;
};