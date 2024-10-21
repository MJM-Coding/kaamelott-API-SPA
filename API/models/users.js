// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from './client.js';

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'createdat',  // !Spécifie le nom de la colonne en minuscules
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedat',  // !Spécifie le nom de la colonne en minuscules
    },
}, {
    // !Ceci est important pour que Sequelize utilise le bon nom de table
    tableName: 'users',
    timestamps: true,  // Active les colonnes createdAt et updatedAt
});

export default User;