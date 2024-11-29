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
import { convertDate } from '@/utils/helper'
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

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
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
        <div className='border-t-2 border-gray-300'>
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
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>

                            <Card className=''>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>
                        </div>

                        <div className='my-8' />

                        <div className='grid lg:grid-cols-2 gap-5'>
                            <Card className=''>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>

                            <Card className=''>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className='lg:pl-4 lg:col-span-2 lg:mt-4'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>

                    <div className='my-5' />

                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>



            {/* <div className='grid grid-cols-5 min-h-screen h-full'>
                <div className='min-[1220px]:col-span-4 col-span-full h-screen grid grid-cols-3 gap-4'>
                    <Card className='bg-lime-950 text-white'>
                        <CardHeader className="pb-2">
                            <p className='text-xs'>
                                Update
                            </p>
                            <CardDescription className='mt-2'>
                                {convertDate(report?.data.update.date)}
                            </CardDescription>
                            <CardTitle className="text-xl">
                                Sales revenue increase {''}
                                <span className='text-lime-400'>{report?.data.update.percentage_change}</span>
                                {''} in 1 week
                            </CardTitle>
                        </CardHeader>
                        <CardContent className=''>
                            <Link href={'/statistics'} className="flex items-center gap-2text-xs text-muted-foreground">
                                See Statistics
                                <ChevronRight />
                            </Link>
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
                            <CardTitle className="">
                                <span className='text-sm'>
                                    {report?.data.net_income.currency}
                                </span>
                                <span className=''>{report?.data.net_income.amount}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm'>
                                <span className='text-green-400'>
                                    <TrendingUp />
                                    {report?.data.net_income.percentage_change}
                                </span>
                                {' '} from last month
                            </p>
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
                            <CardTitle className="">
                                <span className='text-sm'>
                                    {report?.data.total_return.currency}
                                </span>
                                <span className=''>{report?.data.total_return.amount}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm'>
                                <span className='text-red-400'>
                                    <TrendingDown />
                                    {report?.data.total_return.percentage_change}
                                </span>
                                {' '} from last month
                            </p>
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
                            <CardTitle className="font-normal text-sm">
                                <span>{report?.data.revenue.currency}</span>
                                {' '}
                                <span className='text-3xl font-bold'>{report?.data.revenue.amount}</span>
                                {' '}
                                <span className='text-green-400'>{report?.data.revenue.percentage_change}</span>
                                {' '}
                                from last month
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                                </BarChart>
                            </ChartContainer>

                        </CardContent>
                    </Card>
                </div>
                <div className='min-h-screen h-full min-[1220px]:block col-span-1'>
                    <Card className="">
                        <CardHeader className="items-center pb-0">
                            <CardTitle className=''>
                                Total View Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0 border-t-2">
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
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row justify-between">
                            <CardTitle className="">
                                Level up your sales management to the next level
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                An easy way to manage sales with care and precision
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className='bg-lime-950'>
                                Update to Siohioma+
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div> */}

            {/* <div className=''>
                <div className="grid w-full md:grid-cols-4 gap-2">
                    <Card className='bg-lime-950 text-white'>
                        <CardHeader className="pb-2">
                            <p className='text-xs'>
                                Update
                            </p>
                            <CardDescription className='mt-2'>
                                {convertDate(report?.data.update.date)}
                            </CardDescription>
                            <CardTitle className="text-xl">
                                Sales revenue increase {''}
                                <span className='text-lime-400'>{report?.data.update.percentage_change}</span>
                                {''} in 1 week
                            </CardTitle>
                        </CardHeader>
                        <CardContent className=''>
                            <Link href={'/statistics'} className="flex items-center gap-2text-xs text-muted-foreground">
                                See Statistics
                                <ChevronRight />
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <div className='flex justify-between items-center'>
                                <CardDescription>Net Income</CardDescription>
                                <CardDescription className='font-bold text-xl text-black'>
                                    ...
                                </CardDescription>
                            </div>
                            <CardTitle className="">
                                <span className='text-sm'>
                                    {report?.data.net_income.currency}
                                </span>
                                <span className=''>{report?.data.net_income.amount}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm'>
                                <span className='text-green-400'>
                                    {report?.data.net_income.percentage_change}
                                </span>
                                {' '} from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <div className='flex justify-between items-center'>
                                <CardDescription>Total Return</CardDescription>
                                <CardDescription className='font-bold text-xl text-black'>
                                    ...
                                </CardDescription>
                            </div>
                            <CardTitle className="">
                                <span className='text-sm'>
                                    {report?.data.total_return.currency}
                                </span>
                                <span className=''>{report?.data.total_return.amount}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm'>
                                <span className='text-red-400'>
                                    {report?.data.total_return.percentage_change}
                                </span>
                                {' '} from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="">
                        <CardHeader className="items-center pb-0">
                            <CardTitle className=''>
                                Total View Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0 border-t-2">
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
                        </CardContent>
                    </Card>
                </div>

                <div className="grid w-full md:grid-cols-3 gap-2">

                    <Card>
                        <CardHeader className="flex flex-row justify-between">
                            <CardTitle className="">
                                Sales Report
                            </CardTitle>
                            <CardDescription>...</CardDescription>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="">
                            <div className='flex justify-between items-center'>
                                <CardDescription>Revenue</CardDescription>
                                <CardDescription className='flex items-center gap-2'>
                                    <div>Income</div>
                                    <div>Expenses</div>
                                </CardDescription>
                            </div>
                            <CardTitle className="font-normal text-sm">
                                <span>{report?.data.revenue.currency}</span>
                                {' '}
                                <span className='text-3xl font-bold'>{report?.data.revenue.amount}</span>
                                {' '}
                                <span className='text-green-400'>{report?.data.revenue.percentage_change}</span>
                                {' '}
                                from last month
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                                </BarChart>
                            </ChartContainer>

                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row justify-between">
                            <CardTitle className="">
                                Level up your sales management to the next level
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                An easy way to manage sales with care and precision
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className='bg-lime-950'>
                                Update to Siohioma+
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

            </div> */}
        </div>
    )
}

export default Dashboard
