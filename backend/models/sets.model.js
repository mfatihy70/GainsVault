import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Entries from './entries.model.js'; // Import the Entries model

const Sets = sequelize.define('sets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    entry_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Entries,
            key: 'id',
        },
        allowNull: false,
    },
    weight_kg: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    reps: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    time_sec: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rest_sec: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    failure: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
},
{
    comment: "Table for storing workout sets for each entry of an exercise",
});

// Define the relationship
Sets.belongsTo(Entries, { foreignKey: 'entry_id' });
Entries.hasMany(Sets, { foreignKey: 'entry_id', onDelete: 'CASCADE' });

export default Sets;