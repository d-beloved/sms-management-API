module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ReceivedSms', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    receiverId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Contacts',
        key: 'id',
        as: 'receiver',
      },
    },
    smsId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'SentSms',
        key: 'id',
        as: 'sentSms'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    status: {
      type: Sequelize.ENUM,
      values: ['received', 'read'],
      defaultValue: 'received'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('ReceivedSms'),
};
