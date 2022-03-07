import accountType from '../types/account-type'
import accountService from '../../services/account-service'

export const doFindByIdEmailPhoneNum = (keyword) => async (dispatch ) => {
    try {
        var accountResponse = await accountService.doFindAccountByIdEmailPhoneNum(keyword);
        dispatch({
            type: accountType.FIND_BY_ID_EMAIL_PHONENUM_ACCOUNT,
            payload: {
                apiResponse: {
                    success: true,
                    message: "Successfully."
                },
                account: accountResponse.data
            }
        })
    } catch (error) {
        dispatch({
            type: accountType.ERROR_ACTION,
            payload: {
                apiResponse: {
                    success: false,
                    message: error.message,
                }
            }
        })
    }
}