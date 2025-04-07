import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';


const Exercises = sequelize.define('exercises', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    equipment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_bodyweight: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    timestamps: false,
});

export default Exercises;

