import roomtypePhotoService from "../../services/roomtypePhoto-service";
import roomtypePhotoTypes from "../types/roomtypePhoto-type";

export const showRoomtypePhotoByIdRoomtype =
  (idRoomtype) => async (dispatch) => {
    try {
      const dataResponse =
        await roomtypePhotoService.showRoomtypePhotoByIdRoomtype(idRoomtype);
      dispatch({
        type: roomtypePhotoTypes.SHOW_ROOMTYPE_PHOTO_BY_ID_ROOMTYPE,
        payload: {
          apiResponse: {
            success: true,
            message: "Successfully",
          },
          roomtypePhotos: dataResponse.data,
        },
      });
    } catch (error) {
      dispatch({
        type: roomtypePhotoTypes.ERROR_ACTION,
        payload: {
          apiResponse: {
            success: false,
            message: error.message,
          },
          roomtypePhotos: [],
        },
      });
    }
  };

export const setRoomtypePhotoActive = (idRoomtypePhoto, imageUrl, isImgFile) => {
  return {
    type: roomtypePhotoTypes.SET_ROOMTYPE_PHOTO_ACTIVE,
    payload: {
      roomTypePhotoActive: {
        id: idRoomtypePhoto,
        url: imageUrl,
        imgFile: isImgFile
      },
    },
  };
};
