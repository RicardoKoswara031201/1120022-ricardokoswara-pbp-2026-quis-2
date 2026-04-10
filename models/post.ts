import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
});