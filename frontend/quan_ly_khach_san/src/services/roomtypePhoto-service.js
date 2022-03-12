import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const showRoomtypePhotoByIdRoomtype = (idRoomtype) => {
    return httpCommon().get(`${URL_BASE}/api/admin/roomtypePhotos?idRoomtype=${idRoomtype}`)
}

export default {showRoomtypePhotoByIdRoomtype}