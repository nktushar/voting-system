import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const NoticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    //   unique: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NoticeModel = mongoose.model("notice", NoticeSchema);

export default NoticeModel;
