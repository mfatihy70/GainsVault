import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Sessions from './sessions.model.js';
import Exercises from './exercises.model.js';
import Sets from './sets.model.js'; // Import the Sets model

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

// Define the relationship
Entries.hasMany(Sets, { foreignKey: 'entry_id', onDelete: 'CASCADE' });
Sets.belongsTo(Entries, { foreignKey: 'entry_id' });

export default Entries;

