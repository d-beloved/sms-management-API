module.exports = (sequelize, DataTypes) => {
  const SentSms = sequelize.define('SentSms', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('sent', 'delivered'),
      allowNull: false,
      defaultValue: 'sent'
    }
  }, {});
  SentSms.associate = (models) => {
    const { Contact } = models;
    SentSms.belongsTo(Contact, {
      as: 'sender',
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    });
  };
  return SentSms;
};
