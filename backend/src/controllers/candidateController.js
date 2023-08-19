import * as CandidateService from "../services/candidateServices.js";

export const PostCandidate = async (req, res) => {
  const candidate = await CandidateService.PostCandidate(req.body);
  res.json({
    message: "Candidate posted successfully",
    candidate: {
      _id: candidate._id,
      user: candidate.user,
      position: candidate.position,
        fullName: candidate.fullName,
        studentId: candidate.studentId,
        email: candidate.email,
        phone: candidate.phone,
        address: candidate.address,
        interests: candidate.interests,
        reasonToApply: candidate.reasonToApply,
        revolutionGoal: candidate.revolutionGoal,
        transactionId: candidate.transactionId,
    },
  });
};

export const GetCandidate = async (req, res) => {
    const candidate = await CandidateService.GetCandidate();
    res.json({
        message: "Candidate fetched successfully",
        candidate: candidate,
    });
};

export const DeleteCandidate = async (req, res) => {
    const candidate = await CandidateService.DeleteCandidate(req.params.id);
    res.json({
        message: "Candidate deleted successfully",
        candidate: candidate,
    });
};

export const UpdateCandidate = async (req, res) => {
    const candidate = await CandidateService.UpdateCandidate(req.params.id, req.body);
    res.json({
        message: "Candidate updated successfully",
        candidate: candidate,
    });
};
