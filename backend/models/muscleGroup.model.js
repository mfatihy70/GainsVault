import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Exercises from './exercises.model.js';
import Muscles from './muscle.model.js';

const MuscleGroups = sequelize.define('MuscleGroups', {
    exercise_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Exercises,
            key: 'id',
        },
        allowNull: false,
    },
    muscle_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Muscles,
            key: 'id',
        },
        allowNull: false,
    },
    is_primary: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
});

export default MuscleGroups;