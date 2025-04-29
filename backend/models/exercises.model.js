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
    primary_muscle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    secondary_muscle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    equipment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

export default Exercises;

