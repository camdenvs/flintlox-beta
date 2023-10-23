const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// * The following commented code blocks are for the former MongoDB model

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
    }
)

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

// class User extends Model {
//     checkPassword(loginPw) {
//       return bcrypt.compareSync(loginPw, this.password);
//     }
//   }
  
//   User.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           isEmail: true,
//         },
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [8],
//         },
//       },
//       isAdmin: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//       }
//     },
//     {
//       hooks: {
//         beforeCreate: async (newUserData) => {
//           newUserData.password = await bcrypt.hash(newUserData.password, 10);
//           return newUserData;
//         },
//         beforeUpdate: async (updatedUserData) => {
//           updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
//           return updatedUserData;
//         },
//       },
//       sequelize,
//       timestamps: false,
//       freezeTableName: true,
//       underscored: true,
//       modelName: 'user',
//     }
//   );

module.exports = User