import { DataTypes, Model } from "sequelize";
import  sequelize from "./client.js";

// !Modele Character

class Character extends Model {}

Character.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
        },
        actor_name: {
            type: DataTypes.STRING,
        },
        photo: {
            type: DataTypes.STRING,
        },
        appearance_season_episode: {
            type: DataTypes.STRING,
        },
        
        description: {
            type: DataTypes.TEXT,
        },
    },
    {
    sequelize,  
    modelName: "Character",
    tableName: "characters",
    timestamps: false,
  }
);


export default Character;