import PositionModel from "../models/positions.js";

export const PostPosition = async (data) => {
    const { position, club, description, deadline } = data;
    return await PositionModel.create({ position, club, description, deadline});
}
export const GetPosition = async () => {
    return await PositionModel.find();
}
export const DeletePosition = async (id) => {
    return await PositionModel.findByIdAndDelete(id);
}

export const UpdatePosition = async (id, data) => {
    const{position, club, description, deadline} = data;
    return await PositionModel.findByIdAndUpdate(id, {position, club, description, deadline});
}
