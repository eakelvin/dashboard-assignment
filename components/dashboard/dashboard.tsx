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
import { Label, Pie, PieChart } from "recharts";
import { Bar, BarChart } from "recharts"
import { DatePickerWithRange } from './datepicker'

const revenueConfig = {
    revenue: {
        label: "Income",
        color: "#052e16",
    },
    expense: {
        label: "Expenses",
        color: "#a3e635",
    },
} satisfies ChartConfig

const Dashboard = () => {
    const { replace } = useRouter()
    const [token, setToken] = useState<string | null>(null)
    const [id, setId] = useState<string | null>(null)
    const [report, setReport] = useState<Summary | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
        },
    } satisfies ChartConfig;

    const exchangeRateVsFuelData = [
        {
            label: "Exchange Rate Companies",
            number: 40,
            fill: "hsl(var(--chart-1))",
        },
        {
            label: "Fuel Stations",
            number: 60,
            fill: "hsl(var(--chart-2))",
        },
    ];

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
            }
        }

        refreshReports()
    }, [token])

    useEffect(() => {
        console.log('Updated R:', report);
    }, [report])

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
                                    <p>Card Content</p>
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
                                config={chartConfig}
                                className="mx-auto aspect-square max-h-[250px]"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Pie
                                        data={exchangeRateVsFuelData}
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

                            <CardDescription className='mb-2'>
                                Here are some tips on how to improve your score
                            </CardDescription>
                            <Button className='w-full' variant={'outline'}>
                                Guide Views
                            </Button>
                        </CardContent>
                        <CardFooter className='p-1 border-t border-gray-200 flex items-center gap-2'>
                            <div className='!text-[12px] flex flex-row items-center gap-1'>
                                <div className="w-2 h-2 rounded-sm bg-lime-400" />
                                View Count
                            </div>
                            <div className='!text-[12px] flex items-center gap-1'>
                                <div className="w-2 h-2 rounded-sm bg-green-800" />
                                Percentage
                            </div>
                            <div className='!text-[12px] flex flex-row items-center gap-1'>
                                <div className="w-2 h-2 rounded-sm bg-lime-400" />
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


            {/* <div className='grid grid-cols-5 min-h-screen h-full'>
                <div className='min-[1220px]:col-span-4 col-span-full h-screen grid grid-cols-3 gap-4'>
                    <Card className=''>
                        <CardHeader className="pb-2">
                            <p className='text-xs'>
                                Update
                            </p>
                            <CardDescription className='mt-2'>
                                
                            </CardDescription>
                            
                        </CardHeader>
                        <CardContent className=''>
                           
                        </CardContent>
                    </Card>

                    <Card className='rounded-2xl'>
                        <CardHeader className="pb-2">
                            <div className='flex justify-between items-center'>
                                <CardDescription>Net Income</CardDescription>
                                <CardDescription className='font-bold text-xl text-black'>
                                    ...
                                </CardDescription>
                            </div>
                            
                        </CardHeader>
                        <CardContent>
                           
                        </CardContent>
                    </Card>

                    <Card className='rounded-2xl'>
                        <CardHeader className="pb-2">
                            <div className='flex justify-between items-center'>
                                <CardDescription>Total Return</CardDescription>
                                <CardDescription className='font-bold text-xl text-black'>
                                    ...
                                </CardDescription>
                            </div>
                            
                        </CardHeader>
                        <CardContent>
                            
                        </CardContent>
                    </Card>

                    <Card className='w-full rounded-2xl'>
                        <CardHeader className="flex flex-row justify-between">
                            <CardTitle className="">
                                Sales Report
                            </CardTitle>
                            <CardDescription>...</CardDescription>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                    </Card>

                    <Card className='w-full rounded-2xl'>
                        <CardHeader className="">
                            <div className='flex justify-between items-center'>
                                <CardDescription>Revenue</CardDescription>
                                <CardDescription className='flex items-center gap-2'>
                                    <div>Income</div>
                                    <div>Expenses</div>
                                </CardDescription>
                            </div>
                            
                        </CardHeader>
                        <CardContent>
                           

                        </CardContent>
                    </Card>
                </div>
                <div className='min-h-screen h-full min-[1220px]:block col-span-1'>
                    <Card className="">
                        <CardHeader className="items-center pb-0">
                            
                        </CardHeader>
                        <CardContent className="flex-1 pb-0 border-t-2">
                            
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row justify-between">
                            
                        </CardHeader>
                        <CardContent>
                            
                        </CardContent>
                        <CardFooter>
                            
                        </CardFooter>
                    </Card>
                </div>
            </div> */}

        </div>
    )
}

export default Dashboard
