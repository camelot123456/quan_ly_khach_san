import { httpCommon } from "../commons/http-common";
import { URL_BASE } from "../constants";

const findAll = (pagedRequest) => {
  return httpCommon().get(
    `${URL_BASE}/api/admin/rooms/${pagedRequest.roomState}/page/${pagedRequest.currentPage}?sizePage=${pagedRequest.sizePage}&sortField=${pagedRequest.sortField}&sortDir=${pagedRequest.sortDir}&keyword=${pagedRequest.keyword}`
  )
}

const doShowRoomsAdmin = (pagedRequest) => {
  return httpCommon().get(
    `${URL_BASE}/api/admin/rooms/roomStateList/${pagedRequest.roomState}/page/${pagedRequest.currentPage}?sizePage=${pagedRequest.sizePage}&sortField=${pagedRequest.sortField}&sortDir=${pagedRequest.sortDir}&keyword=${pagedRequest.keyword}`
  );
};

const doShowRoomDetailAdmin = (apiRequest) => {
  return httpCommon().get(
    `${URL_BASE}/api/admin/rooms/roomState/${apiRequest.idRoom}?idReservation=${apiRequest.idReservation}`
  );
};

const doUpdateRoomstate = (dataRequest) => {
  return httpCommon().put(`${URL_BASE}/api/admin/rooms/updateRoomState`, dataRequest)
}

const doCheckRoomEmpty = (apiResponse) => {
  return httpCommon().post(`${URL_BASE}/api/admin/rooms/checked`, apiResponse);
};

const doSaveRoom = (dataRequest) => {
  return httpCommon().post(`${URL_BASE}/api/admin/rooms/save`, dataRequest)
}

const doUpdateRoom = (dataRequest) => {
  return httpCommon().put(`${URL_BASE}/api/admin/rooms/update`, dataRequest)
}

const doDeleteRoom = (dataRequest) => {
  return httpCommon().delete(`${URL_BASE}/api/admin/rooms/delete`, {data: dataRequest})
}

export default { findAll, doShowRoomsAdmin, doShowRoomDetailAdmin, doCheckRoomEmpty, doSaveRoom, doUpdateRoom , doDeleteRoom, doUpdateRoomstate};
