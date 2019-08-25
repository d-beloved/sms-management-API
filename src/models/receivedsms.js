module.exports = (sequelize, DataTypes) => {
  const ReceivedSms = sequelize.define('ReceivedSms', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('received', 'read'),
      allowNull: false,
      defaultValue: 'received'
    }
  }, {});
  ReceivedSms.associate = (models) => {
    const { Contact, SentSms } = models;

    ReceivedSms.belongsTo(Contact, {
      onDelete: 'CASCADE',
      as: 'receiver',
      foreignKey: 'receiverId'
    });

    ReceivedSms.belongsTo(SentSms, {
      as: 'sentSms',
      foreignKey: 'smsId'
    });
  };
  return ReceivedSms;
};
