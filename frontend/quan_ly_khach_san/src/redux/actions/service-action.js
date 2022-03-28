import serviceTypes from '../../redux/types/service-type'
import serviceService from '../../services/service-service'

export const doFindAll = () => async (dispatch) => {
    return new Promise((resolve, reject) => {
        serviceService.doFindAll()
        .then((res) => {
            dispatch({
                type: serviceTypes.FIND_ALL_ACTION,
                payload: {
                    services: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject()
        })
    })
}

export const showServiceList = (pagedRequest) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        serviceService.showServiceList(pagedRequest)
        .then((res) => {
            dispatch({
                type: serviceTypes.FIND_ALL_SERVICES_LIST,
                payload: {
                    services: res.data.services,
                    paged: res.data.paged
                }
            })
            resolve()
        })
        .catch((err) => {
            reject()
        })
    })
}