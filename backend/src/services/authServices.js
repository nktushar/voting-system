import UserModel from "../models/users.js";

export const UserRegister = async (data) => {
    const { email, password, fullName, studentId } = data;
    return await UserModel.create({ email, password, fullName, studentId, role: "student" });
}

export const GetUsers = async () => {
    return await UserModel.find();
}