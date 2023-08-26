import mongoose, { SchemaTypes } from "mongoose";

const Schema = mongoose.Schema;

const PositionSchema = new Schema(
  {
    position: {
      type: String,
      required: true,
    },
    club: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "club",
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    positionStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PositionModel = mongoose.model("position", PositionSchema);

export default PositionModel;
