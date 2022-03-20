import statisticType from "../types/statistic-type"

const initialState = {
    revenueStatisticMaxByYear: {},
    revenueStatisticByAllYear: [],
    revenueStatisticByThisYear: {},
    revenueStatisticMaxByQuarter: [],
    revenueStatisticByAllQuarter: [],
    revenueStatisticByThisQuarter: [],
    revenueStatisticMaxByMonth: {},
    revenueStatisticByAllMonth: [],
    revenueStatisticByThisMonth: {},
    revenueStatisticMaxByWeek: {},
    revenueStatisticByAllWeek: [],
    revenueStatisticByThisWeek: {},
    revenueStatisticMaxByDay: {},
    revenueStatisticByThisDay: {},
    statisticPayload: {},
}

const statisticReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case statisticType.SHOW_STATISTIC:
            var revenueStatisticMaxByYear = {...state.revenueStatisticMaxByYear}
            var revenueStatisticByAllYear = {...state.revenueStatisticByAllYear}
            var revenueStatisticByThisYear = {...state.revenueStatisticByThisYear}
            var revenueStatisticMaxByQuarter = {...state.revenueStatisticMaxByQuarter}
            var revenueStatisticByAllQuarter = {...state.revenueStatisticByAllQuarter}
            var revenueStatisticByThisQuarter = {...state.revenueStatisticByThisQuarter}
            var revenueStatisticMaxByMonth = {...state.revenueStatisticMaxByMonth}
            var revenueStatisticByAllMonth = {...state.revenueStatisticByAllMonth}
            var revenueStatisticByThisMonth = {...state.revenueStatisticByThisMonth}
            var revenueStatisticMaxByWeek = {...state.revenueStatisticMaxByWeek}
            var revenueStatisticByAllWeek = {...state.revenueStatisticByAllWeek}
            var revenueStatisticByThisWeek = {...state.revenueStatisticByThisWeek}
            var revenueStatisticMaxByDay = {...state.revenueStatisticMaxByDay}
            var revenueStatisticByThisDay = {...state.revenueStatisticByThisDay}
            var statisticPayload = {...state.statisticPayload}

            revenueStatisticMaxByYear = payload.revenueStatisticMaxByYear
            revenueStatisticByAllYear = payload.revenueStatisticByAllYear
            revenueStatisticByThisYear = payload.revenueStatisticByThisYear
            revenueStatisticMaxByQuarter = payload.revenueStatisticMaxByQuarter
            revenueStatisticByAllQuarter = payload.revenueStatisticByAllQuarter
            revenueStatisticByThisQuarter = payload.revenueStatisticByThisQuarter
            revenueStatisticMaxByMonth = payload.revenueStatisticMaxByMonth
            revenueStatisticByAllMonth = payload.revenueStatisticByAllMonth
            revenueStatisticByThisMonth = payload.revenueStatisticByThisMonth
            revenueStatisticMaxByWeek = payload.revenueStatisticMaxByWeek
            revenueStatisticByAllWeek = payload.revenueStatisticByAllWeek
            revenueStatisticByThisWeek = payload.revenueStatisticByThisWeek
            revenueStatisticMaxByDay = payload.revenueStatisticMaxByDay
            revenueStatisticByThisDay = payload.revenueStatisticByThisDay
            statisticPayload = payload.statisticPayload
            return {
                ...state,
                revenueStatisticMaxByYear: revenueStatisticMaxByYear,
                revenueStatisticByAllYear: revenueStatisticByAllYear,
                revenueStatisticByThisYear: revenueStatisticByThisYear,
                revenueStatisticMaxByQuarter: revenueStatisticMaxByQuarter,
                revenueStatisticByAllQuarter: revenueStatisticByAllQuarter,
                revenueStatisticByThisQuarter: revenueStatisticByThisQuarter,
                revenueStatisticMaxByMonth: revenueStatisticMaxByMonth,
                revenueStatisticByAllMonth: revenueStatisticByAllMonth,
                revenueStatisticByThisMonth: revenueStatisticByThisMonth,
                revenueStatisticMaxByWeek: revenueStatisticMaxByWeek,
                revenueStatisticByAllWeek: revenueStatisticByAllWeek,
                revenueStatisticByThisWeek: revenueStatisticByThisWeek,
                revenueStatisticMaxByDay: revenueStatisticMaxByDay,
                revenueStatisticByThisDay: revenueStatisticByThisDay,
                statisticPayload: statisticPayload
            }
    
        default:
            return state
    }
}

export default statisticReducer