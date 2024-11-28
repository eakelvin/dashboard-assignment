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
import { ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { Bar, BarChart } from "recharts"

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
        <div>
            <h1 className='text-3xl mb-4'>Dashboard</h1>
            <div className=''>
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

            </div>

            {/* <div className=''>

                <section id="testimonies" className="py-20 bg-slate-900">
                    <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                            <ul className="space-y-8">
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/kanyewest" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West"
                                                    />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">Kanye West</h3>
                                                        <p className="text-gray-500 text-md">Rapper &amp; Entrepreneur</p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">Find God.</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/tim_cook" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                                                        <p className="text-gray-500 text-md">CEO of Apple</p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque
                                                    fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                                    aliquam malesuada bibendum.</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/kanyewest" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">Kanye West</h3>
                                                        <p className="text-gray-500 text-md">Rapper &amp; Entrepreneur</p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">Find God.</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/tim_cook" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                                                        <p className="text-gray-500 text-md">CEO of Apple</p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque
                                                    fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                                    aliquam malesuada bibendum.</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                            </ul>

                            <ul className="hidden space-y-8 sm:block">
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/paraga" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg"
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">Parag Agrawal</h3>
                                                        <p className="text-gray-500 text-md">CEO of Twitter</p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">Enim neque volutpat ac tincidunt vitae
                                                    semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam
                                                    pellentesque nec. Turpis cursus in hac habitasse platea dictumst.</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/tim_cook" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                                                        <p className="text-gray-500 text-md">CEO of Apple</p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque
                                                    fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                                    aliquam malesuada bibendum.</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/paraga" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg"
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">Parag Agrawal</h3>
                                                        <p className="text-gray-500 text-md">CEO of Twitter</p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">Enim neque volutpat ac tincidunt vitae
                                                    semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam
                                                    pellentesque nec. Turpis cursus in hac habitasse platea dictumst.</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/tim_cook" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                                                        <p className="text-gray-500 text-md">CEO of Apple</p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque
                                                    fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                                    aliquam malesuada bibendum.</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                            </ul>

                            <ul className="hidden space-y-8 lg:block">
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/satyanadella" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">Satya Nadella</h3>
                                                        <p className="text-gray-500 text-md">CEO of Microsoft</p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">Tortor dignissim convallis aenean et
                                                    tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam
                                                    eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/dan_schulman" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Dan Schulman" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">Dan Schulman</h3>
                                                        <p className="text-gray-500 text-md">CEO of PayPal</p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">Quam pellentesque nec nam aliquam sem
                                                    et tortor consequat id. Enim sit amet venenatis urna cursus.</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/satyanadella" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">Satya Nadella</h3>
                                                        <p className="text-gray-500 text-md">CEO of Microsoft</p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">Tortor dignissim convallis aenean et
                                                    tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam
                                                    eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <div
                                            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                        </div><a href="https://twitter.com/dan_schulman" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Dan Schulman" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">Dan Schulman</h3>
                                                        <p className="text-gray-500 text-md">CEO of PayPal</p>
                                                    </div>
                                                </div>
                                                <p className="leading-normal text-gray-300 text-md">Quam pellentesque nec nam aliquam sem
                                                    et tortor consequat id. Enim sit amet venenatis urna cursus.</p>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>


            </div> */}
        </div>
    )
}

export default Dashboard
