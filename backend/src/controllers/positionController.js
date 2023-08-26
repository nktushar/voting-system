import * as PositionService from "../services/positionServices.js";

export const PostPosition = async (req, res) => {
  const position = await PositionService.PostPosition(req.body);
  res.json({
    message: "Position posted successfully",
    position: {
      _id: position._id,
      position: position.position,
      club: position.club,
      description: position.description,
      deadline: position.deadline,
      positionStatus: position.positionStatus,
    },
  });
};

export const GetPosition = async (req, res) => {
  const position = await PositionService.GetPosition();
  res.json({
    message: "Position fetched successfully",
    position: position,
  });
};

export const DeletePosition = async (req, res) => {
  const position = await PositionService.DeletePosition(req.params.id);
  res.json({
    message: "Position deleted successfully",
    position: position,
  });
};

export const UpdatePosition = async (req, res) => {
  const position = await PositionService.UpdatePosition(
    req.params.id,
    req.body
  );
  res.json({
    message: "Position updated successfully",
    position: position,
  });
};
