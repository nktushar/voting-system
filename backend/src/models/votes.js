import mongoose, { SchemaTypes } from "mongoose";

const Schema = mongoose.Schema;

const VoteSchema = new Schema(
  {
    candidate: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "candidate",
    },
    position: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "position",
    },
    voter: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const VoteModel = mongoose.model("vote", VoteSchema);

export default VoteModel;
