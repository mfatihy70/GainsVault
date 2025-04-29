import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Users from './user.model.js';


const Sessions = sequelize.define('sessions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id',
        },
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    calories_burned: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

export default Sessions;

