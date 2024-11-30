"use client"
import { Summary, User } from '@/utils/types'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import axios from 'axios'
import { convertDate, formatNumber } from '@/utils/helper'
import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react'
import { Button } from '../ui/button'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Label, LabelList, Pie, PieChart, XAxis, YAxis } from "recharts";
import { Bar, BarChart } from "recharts"
import { DatePickerWithRange } from './datepicker'
import { performanceConfig, revenueConfig, salesConfig } from '@/utils/data'
import { Skeleton } from '../ui/skeleton'

const Dashboard = () => {
    const { replace } = useRouter()
    const [token, setToken] = useState<string | null>(null)
    const [report, setReport] = useState<Summary | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        if (!savedToken) {
            toast.error("Please Login")
            replace("/login")
            return
        }
        setToken(savedToken)
    }, [replace])

    useEffect(() => {
        const refreshReports = async () => {
            try {
                setLoading(true)
                const response = await axios.get(
                    `${process.env.BASE_URL}/report/summary/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('New R:', response.data);
                setReport(response.data)
            } catch (error: any) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        refreshReports()
    }, [token])

    const chartData = [
        {
            label: report?.data.total_view_perfomance.percentage,
            number: parseFloat((report?.data.total_view_perfomance.percentage ?? "0").replace("%", "")),
            fill: "var(--color-view)",
        },
        {
            label: report?.data.total_view_perfomance.sales,
            number: parseFloat((report?.data.total_view_perfomance.sales ?? "0").replace("%", "")),
            fill: "var(--color-sales)",
        },
        {
            label: report?.data.total_view_perfomance.view_count,
            number: parseFloat((report?.data.total_view_perfomance.sales ?? "0").replace("%", "")),
            fill: "var(--color-count)",
        },
    ];

    const salesData = [
        {
            report: "Products Launched",
            sales: report?.data.sales_report.product_launched
        },
        {
            report: "Ongoing Products",
            sales: report?.data.sales_report.ongoing_product
        },
        {
            report: "Products Sold",
            sales: report?.data.sales_report.product_sold
        },
    ];

    return (
        <div className='border-t-2 border-gray-200'>
            <div className='grid lg:grid-cols-10 h-screen'>
                <div className='lg:col-span-8 py-2'>
                    <div className='mb-5 sm:mb-3 flex flex-col items-start sm:flex-row sm:items-center justify-between'>
                        <div>
                            <h1 className='text-3xl mb-2'>Dashboard</h1>
                            <p>An easy way to manage sales with care and precision</p>
                        </div>

                        <DatePickerWithRange />
                    </div>

                    <div>
                        {loading ? (
                            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                {[...Array(5)].map((_, idx) => (
                                    <Card className="" key={idx}>
                                        <CardHeader>
                                            <CardTitle>
                                                <Skeleton className="h-4 w-[200px]" />
                                            </CardTitle>
                                            <CardDescription>
                                                <Skeleton className="h-4 w-[200px]" />
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex justify-center">
                                            <Skeleton className="h-12 w-12 rounded-full" />
                                        </CardContent>
                                        <CardFooter>
                                            <Skeleton className="h-4 w-[200px]" />
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                    <Card className='bg-lime-950 text-white'>
                                        <CardHeader>
                                            <CardTitle className='flex items-center gap-1'>
                                                <div className="w-4 h-4 rounded-full bg-red-700" />
                                                Update
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className='text-xs text-muted-foreground'>
                                                {convertDate(report?.data.update.date)}
                                            </p>
                                            <CardTitle className="text-lg">
                                                Sales revenue increase {''}
                                                <span className='text-lime-400'>{report?.data.update.percentage_change}</span>
                                                {''} in 1 week
                                            </CardTitle>
                                        </CardContent>
                                        <CardFooter>
                                            <Link href={'/statistics'} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                See Statistics
                                                <ChevronRight />
                                            </Link>
                                        </CardFooter>
                                    </Card>

                                    <Card>
                                        <CardHeader className='flex flex-row justify-between'>
                                            <CardTitle>Net Income</CardTitle>
                                            <CardTitle>...</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardTitle className='text-sm'>
                                                {report?.data.net_income.currency}
                                            </CardTitle>
                                            <CardTitle className="text-5xl text-center">
                                                <span className=''>
                                                    {report?.data.net_income.amount}
                                                </span>
                                            </CardTitle>
                                        </CardContent>
                                        <CardFooter>
                                            <p className='font-bold text-sm text-green-400 flex items-center gap-2'>
                                                <TrendingUp />
                                                {report?.data.net_income.percentage_change} from last month
                                            </p>
                                        </CardFooter>
                                    </Card>

                                    <Card className=''>
                                        <CardHeader className='flex flex-row items-center justify-between'>
                                            <CardTitle>Total Return</CardTitle>
                                            <CardTitle className=''>...</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardTitle className='text-sm'>
                                                {report?.data.total_return.currency}
                                            </CardTitle>
                                            <CardTitle className="text-5xl text-center">
                                                {report?.data.total_return.amount}
                                            </CardTitle>
                                        </CardContent>
                                        <CardFooter className=''>
                                            <p className='font-bold text-sm text-red-400 flex items-center gap-2'>
                                                <TrendingDown />
                                                {report?.data.total_return.percentage_change} from last month
                                            </p>
                                        </CardFooter>
                                    </Card>
                                </div>

                                <div className='my-8' />

                                <div className='grid lg:grid-cols-2 gap-5'>
                                    <Card className=''>
                                        <CardHeader className='flex flex-row items-center justify-between'>
                                            <CardTitle>Sales Report</CardTitle>
                                            <CardTitle className='align-text-top'>...</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ChartContainer config={salesConfig}>
                                                <BarChart
                                                    accessibilityLayer
                                                    data={salesData}
                                                    layout="vertical"
                                                    margin={{
                                                        right: 16,
                                                    }}
                                                >
                                                    <CartesianGrid horizontal={false} />
                                                    <YAxis
                                                        dataKey="report"
                                                        type="category"
                                                        tickLine={false}
                                                        tickMargin={10}
                                                        axisLine={false}
                                                        tickFormatter={(value) => value.slice(0, 3)}
                                                        hide
                                                    />
                                                    <XAxis
                                                        dataKey="sales"
                                                        type="number"
                                                        tickLine={false}
                                                        tickMargin={10}
                                                        axisLine={false}
                                                    />
                                                    <ChartTooltip
                                                        cursor={false}
                                                        content={<ChartTooltipContent indicator="line" />}
                                                    />
                                                    <Bar
                                                        dataKey="sales"
                                                        layout="vertical"
                                                        fill="var(--color-desktop)"
                                                        radius={4}
                                                    >
                                                        <LabelList
                                                            dataKey="report"
                                                            position="insideLeft"
                                                            offset={8}
                                                            className="fill-black"
                                                            fontSize={12}
                                                        />
                                                        <LabelList
                                                            dataKey="sales"
                                                            position="right"
                                                            offset={8}
                                                            className="fill-foreground"
                                                            fontSize={12}
                                                        />
                                                    </Bar>
                                                </BarChart>
                                            </ChartContainer>
                                        </CardContent>
                                    </Card>

                                    <Card className=''>
                                        <CardHeader className='flex flex-row items-center justify-between border-b'>
                                            <CardTitle>Revenue</CardTitle>
                                            <div className='flex items-center gap-2'>
                                                <CardTitle className='!text-sm font-normal flex items-center gap-1'>
                                                    <div className="w-4 h-4 rounded-sm bg-green-950" />
                                                    Income
                                                </CardTitle>
                                                <CardTitle className='font-normal !text-sm flex flex-row items-center gap-1'>
                                                    <div className="w-4 h-4 rounded-sm bg-lime-400" />
                                                    Expenses
                                                </CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CardTitle className="my-3 font-normal text-sm flex gap-1">
                                                <span>{report?.data.revenue.currency}</span>
                                                {' '}
                                                <span className='text-4xl font-bold text-center'>
                                                    {report?.data.revenue.amount}
                                                </span>{' '}
                                                <span className='text-green-400 flex items-end gap-1'>
                                                    <TrendingUp />
                                                    {report?.data.revenue.percentage_change}
                                                </span>{' '}
                                                <span className='flex items-end'>from last month</span>
                                            </CardTitle>
                                            <ChartContainer config={revenueConfig} className="h-full w-full">
                                                <BarChart accessibilityLayer data={report?.data.revenue.break_down}>
                                                    <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                                                    <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
                                                </BarChart>
                                            </ChartContainer>
                                        </CardContent>
                                    </Card>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className='lg:pl-4 lg:col-span-2 lg:mt-4'>
                    <Card>
                        <CardHeader className='border-b border-gray-200'>
                            <CardTitle>
                                Total View Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={performanceConfig}
                                className="mx-auto aspect-square max-h-[250px]"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent />}
                                    />
                                    <Pie
                                        data={chartData}
                                        dataKey="number"
                                        nameKey="label"
                                        innerRadius={60}
                                        strokeWidth={5}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="fill-foreground text-3xl font-bold"
                                                            >
                                                                {report?.data.total_view_perfomance.total_count}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) + 24}
                                                                className="fill-muted-foreground"
                                                            >
                                                                Total Count
                                                            </tspan>
                                                        </text>
                                                    );
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>

                            <CardDescription className='mb-2 text-center'>
                                Here are some tips on how to improve your score
                            </CardDescription>
                            <Button className='w-full' variant={'outline'}>
                                Guide Views
                            </Button>
                        </CardContent>
                        <CardFooter className='p-5 border-t border-gray-200 flex items-center justify-between gap-2'>
                            <div className='!text-[12px] flex flex-row items-center gap-1'>
                                <div className="w-2 h-2 rounded-sm bg-lime-400" />
                                View Count
                            </div>
                            <div className='!text-[12px] flex items-center gap-1'>
                                <div className="w-2 h-2 rounded-sm bg-green-700" />
                                Percentage
                            </div>
                            <div className='!text-[12px] flex flex-row items-center gap-1'>
                                <div className="w-2 h-2 rounded-sm bg-orange-500" />
                                Sales
                            </div>
                        </CardFooter>
                    </Card>

                    <div className='my-5' />

                    <Card>
                        <CardHeader>
                            <CardTitle className="pt-5">
                                Level up your sales management to the next level
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                An easy way to manage sales with care and precision
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button className='bg-lime-950 w-full'>
                                Update to Siohioma+
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
