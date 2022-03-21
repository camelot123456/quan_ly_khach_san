import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {
  Box,
  Heading,
  HStack,
  VStack,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
  Text,
} from "@chakra-ui/react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  ZAxis,
  Scatter,
} from "recharts";

import "./Dashboard.css";
import {showStatistic} from '../../../../redux/actions/statistic-action'

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];

function Dashboard() {
  var revenueStatisticMaxByYear = useSelector((state => state.statisticReducer.revenueStatisticMaxByYear))
  var revenueStatisticByAllYear = useSelector((state => state.statisticReducer.revenueStatisticByAllYear))
  var revenueStatisticByThisYear = useSelector((state => state.statisticReducer.revenueStatisticByThisYear))

  var revenueStatisticMaxByQuarter = useSelector((state => state.statisticReducer.revenueStatisticMaxByQuarter))
  var revenueStatisticByAllQuarter = useSelector((state => state.statisticReducer.revenueStatisticByAllQuarter))
  var revenueStatisticByThisQuarter = useSelector((state => state.statisticReducer.revenueStatisticByThisQuarter))
  var revenueStatisticMaxByAllQuarter = useSelector((state => state.statisticReducer.revenueStatisticMaxByAllQuarter))

  var revenueStatisticMaxByMonth = useSelector((state => state.statisticReducer.revenueStatisticMaxByMonth))
  var revenueStatisticByAllMonth = useSelector((state => state.statisticReducer.revenueStatisticByAllMonth))
  var revenueStatisticByThisMonth = useSelector((state => state.statisticReducer.revenueStatisticByThisMonth))
  var revenueStatisticMaxByAllMonth = useSelector((state => state.statisticReducer.revenueStatisticMaxByAllMonth))

  var revenueStatisticMaxByWeek = useSelector((state => state.statisticReducer.revenueStatisticMaxByWeek))
  var revenueStatisticByAllWeek = useSelector((state => state.statisticReducer.revenueStatisticByAllWeek))
  var revenueStatisticByThisWeek = useSelector((state => state.statisticReducer.revenueStatisticByThisWeek))
  var revenueStatisticMaxByAllWeek = useSelector((state => state.statisticReducer.revenueStatisticMaxByAllWeek))

  var revenueStatisticMaxByDay = useSelector((state => state.statisticReducer.revenueStatisticMaxByDay))
  var revenueStatisticByThisDay = useSelector((state => state.statisticReducer.revenueStatisticByThisDay))

  var statisticPayload = useSelector((state => state.statisticReducer.statisticPayload))

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStatistic())
  }, [])

  return (
    <>
      <Heading>REVENUE KPI DASHBOARD</Heading>
      <Flex justifyContent="space-between" className="mt-4">
        <Box className="box-container box-1">
          <Stat size="lg">
            <StatLabel fontSize="2xl">Tổng số khách hàng</StatLabel>
            <StatNumber fontSize="4xl">{statisticPayload.totalCustomerGuest + statisticPayload.totalCustomerMember + ""}</StatNumber>
            <StatHelpText fontSize="xl">
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Box>

        <Box className="box-container box-1">
          <Stat size="lg">
            <StatLabel fontSize="2xl">Tổng danh thu</StatLabel>
            <StatNumber fontSize="4xl">{Math.round(statisticPayload.totalRevenue * 100) / 100 + ""}</StatNumber>
            <StatHelpText fontSize="xl">
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Box>

        <Box className="box-container box-1">
          <Stat size="lg">
            <StatLabel fontSize="2xl">Tổng nhân viên</StatLabel>
            <StatNumber fontSize="4xl">{statisticPayload.totalStaff + ""}</StatNumber>
            <StatHelpText fontSize="xl">
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Box>

        <Box className="box-container box-1">
          <Stat size="lg">
            <StatLabel fontSize="2xl">Tổng số giao dịch</StatLabel>
            <StatNumber fontSize="4xl">{statisticPayload.totalTransaction + ""}</StatNumber>
            <StatHelpText fontSize="xl">
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Box>
      </Flex>

      <Flex justifyContent="space-between" className="mt-4">
        <VStack className="box-container box-4 mr-4" alignItems="start">
          {/* -----------------------------------------------------Thống kê doanh thu theo tháng------------------------------------------------------------------ */}
          <Box>
            <Text className="text-heading mb-3">
              Thống kê doanh thu theo năm
            </Text>
            <BarChart
              width={500}
              height={250}
              data={revenueStatisticByAllYear}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" stackId="a" fill="#8884d8" />
            </BarChart>
          </Box>
        </VStack>

        {/* -----------------------------------------------------Thống kê doanh thu theo quý------------------------------------------------------------------ */}
        <VStack className="box-container box-4" alignItems="start">
          <Box>
            <Text className="text-heading mb-3">
              Thống kê doanh thu theo quý
            </Text>
            <ScatterChart
              width={500}
              height={250}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="quarter" name="quarter" unit="" />
              <YAxis type="number" dataKey="total" name="total" unit="$" />
              <ZAxis type="number" range={[100]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter
                name="Quý của năm hiện tại"
                data={revenueStatisticByThisQuarter}
                fill="#8884d8"
                line
                shape="dot"
              />
              <Scatter
                name="Quý của năm vàng"
                data={revenueStatisticMaxByAllQuarter}
                fill="#82ca9d"
                line
                shape="dot"
              />
            </ScatterChart>
          </Box>
        </VStack>
      </Flex>

      <Flex justifyContent="space-between" className="mt-4">
        <VStack className="box-container box-4 mr-4" alignItems="start">
          {/* -----------------------------------------------------Thống kê doanh thu theo tháng------------------------------------------------------------------ */}
          <Box>
            <Text className="text-heading mb-3">
              Thống kê doanh thu theo tháng
            </Text>
            <ScatterChart
              width={500}
              height={250}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="month" name="month" unit="" />
              <YAxis type="number" dataKey="total" name="total" unit="$" />
              <ZAxis type="number" range={[100]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter
                name="Tháng của năm hiện tại"
                data={revenueStatisticByThisMonth}
                fill="#D69E2E"
                line
                shape="diamond"
              />
              <Scatter
                name="tháng của năm vàng"
                data={revenueStatisticMaxByAllMonth}
                fill="#38A169"
                line
                shape="diamond"
              />
            </ScatterChart>
          </Box>
        </VStack>

        <VStack className="box-container box-4" alignItems="start">
          {/* -----------------------------------------------------Thống kê doanh thu theo tuần------------------------------------------------------------------ */}
          <Box>
            <Text className="text-heading mb-3">
              Thống kê doanh thu theo tuần
            </Text>
            <ScatterChart
              width={500}
              height={250}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="week" name="week" unit="" />
              <YAxis type="number" dataKey="total" name="total" unit="$" />
              <ZAxis type="number" range={[100]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter
                name="Tháng của năm hiện tại"
                data={revenueStatisticByThisWeek}
                fill="#DD6B20"
                line
                shape="star"
              />
              <Scatter
                name="tháng của năm vàng"
                data={revenueStatisticMaxByAllWeek}
                fill="#3182CE"
                line
                shape="star"
              />
            </ScatterChart>
          </Box>
        </VStack>
      </Flex>

      {/* -----------------------------------------------------Thống kê doanh thu theo năm------------------------------------------------------------------ */}

      <Flex justifyContent="space-between" className="mt-4">
        <VStack className="box-container box-3 mr-4" alignItems="start">
            <Text className="text-heading mb-3">
              Thống kê số lượng khách hàng theo loại
            </Text>
            <Box>

            </Box>
        </VStack>

        <VStack className="box-container box-2" alignItems="start">
          <Text className="text-heading mb-3">
            Những thành tích đạt được
          </Text>
          {/* var revenueStatisticMaxByYear = useSelector((state => state.statisticReducer.revenueStatisticMaxByYear))
  var revenueStatisticByAllYear = useSelector((state => state.statisticReducer.revenueStatisticByAllYear))
  var revenueStatisticByThisYear = useSelector((state => state.statisticReducer.revenueStatisticByThisYear))

  var revenueStatisticMaxByQuarter = useSelector((state => state.statisticReducer.revenueStatisticMaxByQuarter))
  var revenueStatisticByAllQuarter = useSelector((state => state.statisticReducer.revenueStatisticByAllQuarter))
  var revenueStatisticByThisQuarter = useSelector((state => state.statisticReducer.revenueStatisticByThisQuarter))
  var revenueStatisticMaxByAllQuarter = useSelector((state => state.statisticReducer.revenueStatisticMaxByAllQuarter))

  var revenueStatisticMaxByMonth = useSelector((state => state.statisticReducer.revenueStatisticMaxByMonth))
  var revenueStatisticByAllMonth = useSelector((state => state.statisticReducer.revenueStatisticByAllMonth))
  var revenueStatisticByThisMonth = useSelector((state => state.statisticReducer.revenueStatisticByThisMonth))
  var revenueStatisticMaxByAllMonth = useSelector((state => state.statisticReducer.revenueStatisticMaxByAllMonth))

  var revenueStatisticMaxByWeek = useSelector((state => state.statisticReducer.revenueStatisticMaxByWeek))
  var revenueStatisticByAllWeek = useSelector((state => state.statisticReducer.revenueStatisticByAllWeek))
  var revenueStatisticByThisWeek = useSelector((state => state.statisticReducer.revenueStatisticByThisWeek))
  var revenueStatisticMaxByAllWeek = useSelector((state => state.statisticReducer.revenueStatisticMaxByAllWeek))

  var revenueStatisticMaxByDay = useSelector((state => state.statisticReducer.revenueStatisticMaxByDay))
  var revenueStatisticByThisDay = useSelector((state => state.statisticReducer.revenueStatisticByThisDay)) */}
          <Box>
              <ul>
                <li>Năm đạt doanh thu cao nhất: {`${revenueStatisticMaxByYear.year} - $${revenueStatisticMaxByYear.total}`}</li>
                <li>Quý đạt doanh thu cao nhất: {`Quý ${revenueStatisticMaxByQuarter.quarter} - năm ${revenueStatisticMaxByQuarter.year} - $${revenueStatisticMaxByQuarter.total}`}</li>
                <li>Tháng đạt doanh thu cao nhất: {`${revenueStatisticMaxByMonth.month}-${revenueStatisticMaxByMonth.year} - $${revenueStatisticMaxByMonth.total}`}</li>
                <li>Tuần đạt doanh thu cao nhất: {`Tuần thứ ${revenueStatisticMaxByWeek.week} - năm ${revenueStatisticMaxByWeek.year} - $${revenueStatisticMaxByWeek.total}`}</li>
                <li>Ngày đạt doanh thu cao nhất: {`${revenueStatisticMaxByDay.date}-${revenueStatisticMaxByDay.month}-${revenueStatisticMaxByDay.year} - $${revenueStatisticMaxByDay.total}`}</li>
              </ul>
          </Box>
        </VStack>
      </Flex>
    </>
  );
}

export default Dashboard;
