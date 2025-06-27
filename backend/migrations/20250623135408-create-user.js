'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, type: 
        Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING, 
        unique: true, 
        allowNull: false
      },
      password_hash: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      full_name: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      identity_number: {
        type: Sequelize.STRING, 
        unique: true, 
        allowNull: false
      },
      role_id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'Roles', key: 'id' }
      },
      createdAt: {
        allowNull: false, type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false, type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};