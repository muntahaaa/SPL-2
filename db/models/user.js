'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../config/database');
const AppError = require('../../utils/appError');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userType: {
    type: DataTypes.ENUM('admin', 'staff', 'visitor'),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'User Type cannot be null',
      },
      notEmpty: {
        msg: 'User Type cannot be empty',
      },
    },

  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Username cannot be null',
      },
      notEmpty: {
        msg: 'Username cannot be empty',
      },
    },
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'email cannot be null',
      },
      notEmpty: {
        msg: 'email cannot be empty',
      },
      isEmail: {
        msg: 'Invalid email id',
      },
    },
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'password cannot be null',
      },
      notEmpty: {
        msg: 'password cannot be empty',
      },
    },
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value) {
      if (value !== this.Password) {
        throw new Error('Password confirmation does not match');
      }
    }
  },
  FullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  RoleID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'user' // Specify the table name here
});

// Hash the password before saving the user
User.beforeCreate(async (user) => {
  if (user.Password) {
    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(user.Password, salt);
  }
});

module.exports = User;