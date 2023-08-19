import * as VoteService from "../services/voteServices.js";

export const PostVote = async (req, res) => {
  const body = req.body;
  const user = req.user;
  const data = {
    ...body,
    voter: user._id,
  };
  const vote = await VoteService.PostVote(data);
  res.json({
    message: "Vote posted successfully",
    Vote: {
      _id: vote._id,
      candidate: vote.candidate,
      position: vote.position,
      voter: vote.voter,
    },
  });
};

export const GetVote = async (req, res) => {
  const vote = await VoteService.GetVote();
  res.json({
    message: "Votes fetched successfully",
    vote: vote,
  });
};

export const MyVote = async (req, res) => {
  const user = req.user;
  const vote = await VoteService.MyVote(user._id);
  res.json({
    message: "Votes fetched successfully",
    vote: vote,
  });
};
