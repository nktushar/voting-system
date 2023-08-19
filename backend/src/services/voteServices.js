import VoteModel from "../models/votes.js";

export const PostVote = async (data) => {
  return await VoteModel.create(data);
};
export const GetVote = async () => {
  return await VoteModel.find();
};

export const MyVote = async (userId) => {
  return await VoteModel.find({
    voter: userId,
  });
};
