import * as CandidateService from "../services/candidateServices.js";

export const PostCandidate = async (req, res) => {
  const candidate = await CandidateService.PostCandidate(req.body);
  res.json({
    message: "Candidate posted successfully",
    candidate,
  });
};

export const GetCandidate = async (req, res) => {
  const candidate = await CandidateService.GetCandidate();
  res.json({
    message: "Candidate fetched successfully",
    candidate: candidate,
  });
};

export const GetCandidateById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const candidate = await CandidateService.GetCandidateById(id);
    res.json({
      message: "Candidate found",
      candidate: candidate,
    });
  } catch (error) {
    res.json({
      message: error.message,
      candidate: null,
    });
  }
};

export const DeleteCandidate = async (req, res) => {
  const candidate = await CandidateService.DeleteCandidate(req.params.id);
  res.json({
    message: "Candidate deleted successfully",
    candidate: candidate,
  });
};

export const UpdateCandidate = async (req, res) => {
  const candidate = await CandidateService.UpdateCandidate(
    req.params.id,
    req.body
  );
  res.json({
    message: "Candidate updated successfully",
    candidate: candidate,
  });
};
