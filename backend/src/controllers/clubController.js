import * as ClubService from "../services/clubServices.js";

export const PostClub = async (req, res) => {
  const club = await ClubService.PostClub(req.body);
  res.json({
    message: "Club posted successfully",
    club: {
      _id: club._id,
      heading: club.heading,
    },
  });
};

export const GetClub = async (req, res) => {
    const club = await ClubService.GetClub();
    res.json({
        message: "Club fetched successfully",
        club: club,
    });
};

export const DeleteClub = async (req, res) => {
    const club = await ClubService.DeleteClub(req.params.id);
    res.json({
        message: "Club deleted successfully",
        club: club,
    });
};

export const UpdateClub = async (req, res) => {
    const club = await ClubService.UpdateClub(req.params.id, req.body);
    res.json({
        message: "Club updated successfully",
        club: club,
    });
};
