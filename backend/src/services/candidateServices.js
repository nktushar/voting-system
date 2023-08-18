import CandidateModel from "../models/candidates.js";

export const PostCandidate = async (data) => {
    const { user, position, fullName, studentId, email, phone, address, interests, reasonToApply, revolutionGoal, transactionId } = data;
    return await CandidateModel.create({ user, position, fullName, studentId, email, phone, address, interests, reasonToApply, revolutionGoal, transactionId });
}
export const GetCandidate = async () => {
    return await CandidateModel.find();
}
export const DeleteCandidate = async (id) => {
    return await CandidateModel.findByIdAndDelete(id);
}

export const UpdateCandidate = async (id, data) => {
    const{user, position, fullName, studentId, email, phone, address, interests, reasonToApply, revolutionGoal, transactionId} = data;
    return await CandidateModel.findByIdAndUpdate(id, {user, position, fullName, studentId, email, phone, address, interests, reasonToApply, revolutionGoal, transactionId});
}
