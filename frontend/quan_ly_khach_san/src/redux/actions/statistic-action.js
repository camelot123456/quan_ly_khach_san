import statisticService from "../../services/statistic-service";
import statisticType from "../../redux/types/statistic-type";

export const showStatistic = () => dispatch => {
    return new Promise((resolve, reject) => {
        statisticService.showStatistic()
        .then((res) => {
            dispatch({
                type: statisticType.SHOW_STATISTIC,
                payload: {
                    revenueStatisticMaxByYear: res.data.revenueStatisticMaxByYear,
                    revenueStatisticByAllYear: res.data.revenueStatisticByAllYear,
                    revenueStatisticByThisYear: res.data.revenueStatisticByThisYear,

                    revenueStatisticMaxByQuarter: res.data.revenueStatisticMaxByQuarter,
                    revenueStatisticByAllQuarter: res.data.revenueStatisticByAllQuarter,
                    revenueStatisticByThisQuarter: res.data.revenueStatisticByThisQuarter,

                    revenueStatisticMaxByMonth: res.data.revenueStatisticMaxByMonth,
                    revenueStatisticByAllMonth: res.data.revenueStatisticByAllMonth,
                    revenueStatisticByThisMonth: res.data.revenueStatisticByThisMonth,

                    revenueStatisticMaxByWeek: res.data.revenueStatisticMaxByWeek,
                    revenueStatisticByAllWeek: res.data.revenueStatisticByAllWeek,
                    revenueStatisticByThisWeek: res.data.revenueStatisticByThisWeek,

                    revenueStatisticMaxByDay: res.data.revenueStatisticMaxByDay,
                    revenueStatisticByThisDay: res.data.revenueStatisticByThisDay,
                    statisticPayload: res.data.statisticPayload,
                }
            })
            resolve()
        })
        .catch((err) => {
            reject()
        })
    })
}