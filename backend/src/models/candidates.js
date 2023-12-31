import mongoose, { SchemaTypes } from "mongoose";

const Schema = mongoose.Schema;

const CandidateSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
    position: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "position",
    },
    fullName: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    interests: {
      type: String,
      required: true,
    },
    reasonToApply: {
      type: String,
      required: true,
    },
    revolutionGoal: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    assignedPosition: {
      type: SchemaTypes.ObjectId,
      ref: "position",
    },

    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CandidateModel = mongoose.model("candidate", CandidateSchema);

export default CandidateModel;
