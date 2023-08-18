import * as NoticeService from "../services/noticeServices.js";
// import * as NoticeService from "../services/noticeServices.js";

export const PostNotice = async (req, res) => {
  const notice = await NoticeService.PostNotice(req.body);
  res.json({
    message: "Notice posted successfully",
    notice: {
      _id: notice._id,
      title: notice.title,
      body: notice.body,
    },
  });
};

export const GetNotice = async (req, res) => {
    const notice = await NoticeService.GetNotice();
    res.json({
        message: "Notice fetched successfully",
        notice: notice,
    });
};

export const DeleteNotice = async (req, res) => {
    const notice = await NoticeService.DeleteNotice(req.params.id);
    res.json({
        message: "Notice deleted successfully",
        notice: notice,
    });
};

export const UpdateNotice = async (req, res) => {
    const notice = await NoticeService.UpdateNotice(req.params.id, req.body);
    res.json({
        message: "Notice updated successfully",
        notice: notice,
    });
};




// const { StatusCodes } = require("http-status-codes");
// const { response } = require("../utils/response");

// const getAllDepertments = async (req, res) => {
//   try {
//     const { DepartmentModel, user } = req;

//     let depertments = await DepartmentModel.find()?.populate(
//       "lastModifiedBy",
//       "name"
//     );

//     return response(res, StatusCodes.OK, true, depertments, `Successful.`);
//   } catch (error) {
//     return response(
//       res,
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       false,
//       null,
//       error.message
//     );
//   }
// };

// const createDepertment = async (req, res) => {
//   try {
//     const { DepartmentModel, user } = req;

//     const { name } = req.body;

//     console.log("user: ", user?._id);

//     if (!name) {
//       return response(
//         res,
//         StatusCodes.BAD_REQUEST,
//         false,
//         null,
//         "Depertment name required."
//       );
//     }

//     const value = {
//       name: name?.toLowerCase(),
//       lastModifiedBy: user?._id,
//     };

//     console.log("value: ", value);

//     const depertment = await DepartmentModel.create(value);

//     if (!depertment) {
//       return response(
//         res,
//         StatusCodes.BAD_REQUEST,
//         false,
//         null,
//         "Can't create depertment."
//       );
//     }

//     return response(res, StatusCodes.OK, true, depertment, `Successful.`);
//   } catch (error) {
//     return response(
//       res,
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       false,
//       null,
//       error.message
//     );
//   }
// };

// const updateDepertment = async (req, res) => {
//   try {
//     const { DepartmentModel, user } = req;

//     const { name } = req.body;

//     const { id } = req.params;

//     if (!id) {
//       return response(
//         res,
//         StatusCodes.BAD_REQUEST,
//         false,
//         null,
//         "id is required."
//       );
//     }

//     if (!name) {
//       return response(
//         res,
//         StatusCodes.BAD_REQUEST,
//         false,
//         null,
//         "Depertment is required."
//       );
//     }

//     const depertment = await DepartmentModel.findByIdAndUpdate(
//       { _id: id },
//       {
//         name: name?.toLowerCase(),
//         lastModifiedBy: user?._id,
//       },
//       { new: true }
//     );

//     console.log("depertment: ", depertment);

//     if (!depertment) {
//       return response(
//         res,
//         StatusCodes.BAD_REQUEST,
//         false,
//         null,
//         "Can't update depertment."
//       );
//     }

//     return response(res, StatusCodes.OK, true, depertment, `Successful.`);
//   } catch (error) {
//     return response(
//       res,
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       false,
//       null,
//       error.message
//     );
//   }
// };

// const deleteDepertment = async (req, res) => {
//   try {
//     const { DepartmentModel } = req;

//     const { id } = req.params;

//     if (!id) {
//       return response(
//         res,
//         StatusCodes.BAD_REQUEST,
//         false,
//         null,
//         "id is required."
//       );
//     }

//     const depertment = await DepartmentModel.findOneAndDelete({
//       _id: id,
//     });

//     if (!depertment) {
//       return response(
//         res,
//         StatusCodes.BAD_REQUEST,
//         false,
//         null,
//         "Can't delete depertment."
//       );
//     }

//     return response(
//       res,
//       StatusCodes.OK,
//       true,
//       depertment,
//       `Successfully deleted.`
//     );
//   } catch (error) {
//     return response(
//       res,
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       false,
//       null,
//       error.message
//     );
//   }
// };

// module.exports = {
//   getAllDepertments,
//   createDepertment,
//   updateDepertment,
//   deleteDepertment,
// };
