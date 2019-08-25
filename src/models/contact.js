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
    const { SentSms, ReceivedSms, } = models;
    // associations can be defined here
    Contact.hasMany(SentSms, {
      as: 'sentSms',
      foreignKey: 'senderId'
    });

    Contact.hasMany(ReceivedSms, {
      as: 'receivedSms',
      foreignKey: 'receiverId'
    });
  };
  return Contact;
};
