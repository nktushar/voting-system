import ClubModel from "../models/clubs.js";

export const PostClub = async (data) => {
    const { heading } = data;
    return await ClubModel.create({ heading});
}
export const GetClub = async () => {
    return await ClubModel.find();
}
export const DeleteClub = async (id) => {
    return await ClubModel.findByIdAndDelete(id);
}

export const UpdateClub = async (id, data) => {
    const{heading} = data;
    return await ClubModel.findByIdAndUpdate(id, {heading});
}
