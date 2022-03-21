import { httpCommon, httpFormDataCommon } from "../commons/http-common";
import { URL_BASE } from "../constants";

const doShowRoomtypeList = () => {
  return httpCommon().get(`${URL_BASE}/api/admin/roomtypes`);
};

const doFindRoomtypeById = (idRoomtype) => {
  return httpCommon().get(`${URL_BASE}/api/admin/roomtypes/${idRoomtype}`);
};

const doShowRoomtypeByAvatarStateList = () => {
  return httpCommon().get(`${URL_BASE}/api/admin/roomtypes/avatar-state`);
};

const doCreateRoomtype = (formData) => {
  return httpFormDataCommon().post(
    `${URL_BASE}/api/admin/roomtypes/create`,
    formData
  );
};

const doUpdateRoomtype = (formData) => {
  return httpFormDataCommon().put(
    `${URL_BASE}/api/admin/roomtypes/update`,
    formData
  );
};

const doDeleteRoomtypeById = (idRoomtype) => {
  return httpCommon().delete(
    `${URL_BASE}/api/admin/roomtypes/delete`,
    {data : {id : idRoomtype}}
  );
};


const showRoomtypePublic = (pagedRequest) => {
  return httpCommon().get(
    `${URL_BASE}/api/roomtypes/page/${pagedRequest.currentPage}?sizePage=${pagedRequest.sizePage}&sortField=${pagedRequest.sortField}&sortDir=${pagedRequest.sortDir}&keyword=${pagedRequest.keyword}`
  )
}

export default {
  doShowRoomtypeList,
  doFindRoomtypeById,
  doShowRoomtypeByAvatarStateList,
  doCreateRoomtype,
  doDeleteRoomtypeById,
  doUpdateRoomtype,
  showRoomtypePublic
};
