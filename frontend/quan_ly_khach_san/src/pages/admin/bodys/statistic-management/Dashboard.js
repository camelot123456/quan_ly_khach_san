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
  var revenueStatisticMaxByMonth = useSelector((state => state.statisticReducer.revenueStatisticMaxByMonth))
  var revenueStatisticByAllMonth = useSelector((state => state.statisticReducer.revenueStatisticByAllMonth))
  var revenueStatisticByThisMonth = useSelector((state => state.statisticReducer.revenueStatisticByThisMonth))
  var revenueStatisticMaxByWeek = useSelector((state => state.statisticReducer.revenueStatisticMaxByWeek))
  var revenueStatisticByAllWeek = useSelector((state => state.statisticReducer.revenueStatisticByAllWeek))
  var revenueStatisticByThisWeek = useSelector((state => state.statisticReducer.revenueStatisticByThisWeek))
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
            <StatNumber fontSize="4xl">{statisticPayload.totalCustomerGuest + statisticPayload.totalCustomerMember}</StatNumber>
            <StatHelpText fontSize="xl">
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Box>

        <Box className="box-container box-1">
          <Stat size="lg">
            <StatLabel fontSize="2xl">Tổng danh thu</StatLabel>
            <StatNumber fontSize="4xl">{Math.round(statisticPayload.totalRevenue * 100) / 100}</StatNumber>
            <StatHelpText fontSize="xl">
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Box>

        <Box className="box-container box-1">
          <Stat size="lg">
            <StatLabel fontSize="2xl">Tổng nhân viên</StatLabel>
            <StatNumber fontSize="4xl">{statisticPayload.totalStaff}</StatNumber>
            <StatHelpText fontSize="xl">
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Box>

        <Box className="box-container box-1">
          <Stat size="lg">
            <StatLabel fontSize="2xl">Tổng số giao dịch</StatLabel>
            <StatNumber fontSize="4xl">{statisticPayload.totalTransaction}</StatNumber>
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
              height={300}
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

        {/* -----------------------------------------------------Thống kê doanh thu theo tháng------------------------------------------------------------------ */}
        <VStack className="box-container box-4" alignItems="start">
          <Box>
            <Text className="text-heading mb-3">
              Thống kê doanh thu theo quý
            </Text>
            <BarChart
              width={500}
              height={300}
              data={revenueStatisticMaxByQuarter}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
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
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </Box>
        </VStack>

        <VStack className="box-container box-4" alignItems="start">
          {/* -----------------------------------------------------Thống kê doanh thu theo tháng------------------------------------------------------------------ */}
          <Box>
            <Text className="text-heading mb-3">
              Thống kê doanh thu theo tuần
            </Text>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </Box>
        </VStack>
      </Flex>

      {/* -----------------------------------------------------Thống kê doanh thu theo năm------------------------------------------------------------------ */}

      <Flex justifyContent="space-between" className="mt-4">
        <VStack className="box-container box-2 mr-4" alignItems="start">
          <Box>
            <Text className="text-heading mb-3">
              Thống kê loại khách hàng theo tháng
            </Text>
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="amt"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </Box>

          <HStack>
            <Box>
              <Text className="text-heading mb-3">
                Thống kê doanh thu theo tháng
              </Text>
            </Box>

            <Box></Box>
          </HStack>
        </VStack>

        <VStack className="box-container box-3">
          <Box>
            <Text className="text-heading mb-3">
              Thống kê loại khách hàng đã đặt phòng trong tháng
            </Text>
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="amt"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </Box>
          <Box></Box>
        </VStack>
      </Flex>
    </>
  );
}

export default Dashboard;
