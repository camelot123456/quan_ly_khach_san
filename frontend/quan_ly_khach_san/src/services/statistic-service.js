import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const showStatistic = () => {
    return httpCommon().get(`${URL_BASE}/api/admin/statistic`)
}

export default {showStatistic}