import statisticType from "../types/statistic-type"

const initialState = {
    revenueStatisticMaxByYear: {},
    revenueStatisticByAllYear: [],
    revenueStatisticByThisYear: {},
    
    revenueStatisticMaxByQuarter: {},
    revenueStatisticByAllQuarter: [],
    revenueStatisticByThisQuarter: [],
    revenueStatisticMaxByAllQuarter: [],

    revenueStatisticMaxByMonth: {},
    revenueStatisticByAllMonth: [],
    revenueStatisticByThisMonth: [],
    revenueStatisticMaxByAllMonth: [],

    revenueStatisticMaxByWeek: {},
    revenueStatisticByAllWeek: [],
    revenueStatisticByThisWeek: [],
    revenueStatisticMaxByAllWeek: [],

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
            var revenueStatisticMaxByAllQuarter = {...state.revenueStatisticMaxByAllQuarter}
            
            var revenueStatisticMaxByMonth = {...state.revenueStatisticMaxByMonth}
            var revenueStatisticByAllMonth = {...state.revenueStatisticByAllMonth}
            var revenueStatisticByThisMonth = {...state.revenueStatisticByThisMonth}
            var revenueStatisticMaxByAllMonth = {...state.revenueStatisticMaxByAllMonth}

            var revenueStatisticMaxByWeek = {...state.revenueStatisticMaxByWeek}
            var revenueStatisticByAllWeek = {...state.revenueStatisticByAllWeek}
            var revenueStatisticByThisWeek = {...state.revenueStatisticByThisWeek}
            var revenueStatisticMaxByAllWeek = {...state.revenueStatisticMaxByAllWeek}

            var revenueStatisticMaxByDay = {...state.revenueStatisticMaxByDay}
            var revenueStatisticByThisDay = {...state.revenueStatisticByThisDay}

            var statisticPayload = {...state.statisticPayload}

            revenueStatisticMaxByYear = payload.revenueStatisticMaxByYear
            revenueStatisticByAllYear = payload.revenueStatisticByAllYear
            revenueStatisticByThisYear = payload.revenueStatisticByThisYear

            revenueStatisticMaxByQuarter = payload.revenueStatisticMaxByQuarter
            revenueStatisticByAllQuarter = payload.revenueStatisticByAllQuarter
            revenueStatisticByThisQuarter = payload.revenueStatisticByThisQuarter
            revenueStatisticMaxByAllQuarter = payload.revenueStatisticMaxByAllQuarter
            
            revenueStatisticMaxByMonth = payload.revenueStatisticMaxByMonth
            revenueStatisticByAllMonth = payload.revenueStatisticByAllMonth
            revenueStatisticByThisMonth = payload.revenueStatisticByThisMonth
            revenueStatisticMaxByAllMonth = payload.revenueStatisticMaxByAllMonth

            revenueStatisticMaxByWeek = payload.revenueStatisticMaxByWeek
            revenueStatisticByAllWeek = payload.revenueStatisticByAllWeek
            revenueStatisticByThisWeek = payload.revenueStatisticByThisWeek
            revenueStatisticMaxByAllWeek = payload.revenueStatisticMaxByAllWeek

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
                revenueStatisticMaxByAllQuarter: revenueStatisticMaxByAllQuarter,

                revenueStatisticMaxByMonth: revenueStatisticMaxByMonth,
                revenueStatisticByAllMonth: revenueStatisticByAllMonth,
                revenueStatisticByThisMonth: revenueStatisticByThisMonth,
                revenueStatisticMaxByAllMonth: revenueStatisticMaxByAllMonth,

                revenueStatisticMaxByWeek: revenueStatisticMaxByWeek,
                revenueStatisticByAllWeek: revenueStatisticByAllWeek,
                revenueStatisticByThisWeek: revenueStatisticByThisWeek,
                revenueStatisticMaxByAllWeek: revenueStatisticMaxByAllWeek,

                revenueStatisticMaxByDay: revenueStatisticMaxByDay,
                revenueStatisticByThisDay: revenueStatisticByThisDay,
                
                statisticPayload: statisticPayload
            }
    
        default:
            return state
    }
}

export default statisticReducer