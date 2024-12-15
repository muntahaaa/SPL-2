'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('item', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
       
      },
      latitude: {
        type: Sequelize.DECIMAL,
      },
      longitude: {
        type: Sequelize.DECIMAL,
      },
      displayStatus: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active',
      },
      
      category: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
    },
    mediaAttachment: {
      type: Sequelize.BLOB('long'), // Use BLOB to store binary data
      allowNull: true, // Set to false if the attribute should not be null
    },
    createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }

      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('item');
  }
};