import serviceTypes from '../../redux/types/service-type'
import serviceService from '../../services/service-service'

export const doFindAll = () => async (dispatch) => {
    try {
        const serviceResponse = await serviceService.doFindAll();
        dispatch({
            type: serviceTypes.FIND_ALL_ACTION,
            payload: {
                apiResponse: {
                    message: 'Successfully.',
                    success: true
                },
                services: serviceResponse.data
            }
        })
    } catch (error) {
        dispatch({
            type: serviceTypes.ERROR_ACTION,
            payload: {
                apiResponse: {
                    success: false,
                    message: error.message,
                },
                services: []
            }
        })
    }
}