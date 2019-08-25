'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  Contact.associate = (models) => {
    const { sms } = models;
    // associations can be defined here
    Contact.hasMany(sms, {
      as: 'sender',
      foreignKey: 'senderId'
    });

    Contact.hasMany(sms, {
      as: 'receiver',
      foreignKey: 'receiverId'
    });
  };
  return Contact;
};
