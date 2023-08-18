import NoticeModel from "../models/notices.js";

export const PostNotice = async (data) => {
    const { title, body} = data;
    return await NoticeModel.create({ title, body});
}
export const GetNotice = async () => {
    return await NoticeModel.find();
}
export const DeleteNotice = async (id) => {
    return await NoticeModel.findByIdAndDelete(id);
}

export const UpdateNotice = async (id, data) => {
    const{title, body} = data;
    return await NoticeModel.findByIdAndUpdate(id, {title, body});
}
