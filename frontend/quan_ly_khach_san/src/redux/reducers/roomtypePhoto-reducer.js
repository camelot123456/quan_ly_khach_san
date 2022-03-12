import roomtypePhotoTypes from "../types/roomtypePhoto-type";

const initialState = {
    apiResponse: {},
    roomtypePhotos: [],
    roomtypePhoto: {},
    roomtypePhotoActive: {}
}

const roomtypePhotoReducer = (state = initialState, { type, payload}) => {
    switch (type) {
        case roomtypePhotoTypes.SHOW_ROOMTYPE_PHOTO_BY_ID_ROOMTYPE:
            return {
                ...state,
                apiResponse: payload.apiResponse,
                roomtypePhotos: payload.roomtypePhotos
            };
        case roomtypePhotoTypes.SET_ROOMTYPE_PHOTO_ACTIVE:
            var roomTypePhotoActiveNew = { ...state.roomtypePhotoActive}
            roomTypePhotoActiveNew = payload.roomTypePhotoActive
            return {
                ...state,
                roomtypePhotoActive: roomTypePhotoActiveNew
            };
        case roomtypePhotoTypes.ERROR_ACTION:
            return {
                ...state,
                apiResponse: payload.apiResponse
            };
        default:
            return state
    }
}

export default roomtypePhotoReducer