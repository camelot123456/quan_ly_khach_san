import { httpCommon } from "../commons/http-common";
import { URL_BASE } from "../constants";

const doShowRoomsAdmin = (pagedRequest) => {
  return httpCommon().get(
    `${URL_BASE}/api/admin/rooms/${pagedRequest.roomState}/page/${pagedRequest.currentPage}?sizePage=${pagedRequest.sizePage}&sortField=${pagedRequest.sortField}&sortDir=${pagedRequest.sortDir}&keyword=${pagedRequest.keyword}`
  );
};

const doShowRoomDetailAdmin = (apiRequest) => {
  return httpCommon().get(
    `${URL_BASE}/api/admin/rooms/${apiRequest.idRoom}?idTransaction=${apiRequest.idTransaction}`
  );
};

const doCheckRoomEmpty = (apiResponse) => {
  return httpCommon().post(`${URL_BASE}/api/admin/rooms/checked`, apiResponse);
};

export default { doShowRoomsAdmin, doShowRoomDetailAdmin, doCheckRoomEmpty };
