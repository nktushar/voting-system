import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const ClubSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ClubModel = mongoose.model("club", ClubSchema);

export default ClubModel;
