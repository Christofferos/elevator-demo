import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

export class Elevator extends Model {
  elevatorId!: string;
  isIdle!: boolean;
  currentFloor!: number;
  destinationFloor!: number;
}

Elevator.init(
  {
    elevatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    isIdle: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    currentFloor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    destinationFloor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize }
);
