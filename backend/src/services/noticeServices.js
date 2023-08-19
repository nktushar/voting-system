import NoticeModel from "../models/notices.js";

export const PostNotice = async (data) => {
  const { title, body } = data;
  return await NoticeModel.create({ title, body });
};
export const GetNotice = async (limit) => {
  return await NoticeModel.find().sort({ createdAt: -1 }).limit(limit);
};
export const DeleteNotice = async (id) => {
  return await NoticeModel.findByIdAndDelete(id);
};

export const UpdateNotice = async (id, data) => {
  const { title, body } = data;
  return await NoticeModel.findByIdAndUpdate(id, { title, body });
};
