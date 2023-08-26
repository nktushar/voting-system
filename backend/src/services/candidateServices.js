import CandidateModel from "../models/candidates.js";

export const PostCandidate = async (data) => {
  const {
    user,
    position,
    fullName,
    studentId,
    email,
    phone,
    address,
    interests,
    reasonToApply,
    revolutionGoal,
    paymentMethod,
    transactionId,
    paymentStatus,
    profilePicture,
  } = data;
  return await CandidateModel.create({
    user,
    position,
    fullName,
    studentId,
    email,
    phone,
    address,
    interests,
    reasonToApply,
    revolutionGoal,
    paymentMethod,
    transactionId,
    paymentStatus,
    profilePicture,
  });
};

export const GetCandidate = async () => {
  return await CandidateModel.find().populate("position");
};

export const GetCandidateById = async (id) => {
  try {
    const candidate = (await CandidateModel.findOne({ user: id })).populate(
      "position"
    );
    if (!candidate) throw new Error("Candidate not found");
    return candidate;
  } catch (error) {
    throw error;
  }
};

export const DeleteCandidate = async (id) => {
  return await CandidateModel.findByIdAndDelete(id);
};

export const UpdateCandidate = async (id, data) => {
  const {
    user,
    position,
    fullName,
    studentId,
    email,
    phone,
    address,
    interests,
    reasonToApply,
    revolutionGoal,
    paymentMethod,
    paymentStatus,
    status,
    assignedPosition,
    transactionId,
  } = data;
  return await CandidateModel.findByIdAndUpdate(id, {
    user,
    position,
    fullName,
    studentId,
    email,
    phone,
    address,
    interests,
    reasonToApply,
    revolutionGoal,
    paymentMethod,
    paymentStatus,
    status,
    assignedPosition,
    transactionId,
  });
};
