import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Sessions from './sessions.model.js';
import Exercises from './exercises.model.js';

const Entries = sequelize.define('entries', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    session_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Sessions,
            key: 'id',
        },
        allowNull: false,
    },
    exercise_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Exercises,
            key: 'id',
        },
        allowNull: false,
    },
    rpe: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
},
    {
        comment: "Table for storing workout entries holding each set of an exercise",
    });

export default Entries;

