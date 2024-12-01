"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Input } from '../ui/input'
import Image from 'next/image'
import forest from '@/assets/images/fore.avif'
import { useForm, SubmitHandler } from 'react-hook-form'
import { EyeOff, Eye } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Spinner from '../ui/spinner'
import { Auth } from '@/utils/types'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const { replace } = useRouter()

    const {
        register, handleSubmit, watch, reset, formState: { errors }
    } = useForm<Auth>();
    const monitor = watch()

    const onSubmit: SubmitHandler<Auth> = async (data) => {
        try {
            setLoading(true)
            const response = await axios.post(
                `${process.env.BASE_URL}/auth/login/`,
                data
            );
            if (response.data.status === true) {
                const { access, refresh } = response.data.data
                if (access && refresh) {
                    localStorage.setItem("token", access)
                    localStorage.setItem("refresh", refresh)
                }
            };
            toast.success("Login Successfully, Redirecting...")
            console.log(response.data)
            replace('/dashboard')
        } catch (error: any) {
            console.log(error);
            toast.error("An Error occured. Please try again")
        } finally {
            setLoading(false)
            reset()
        }
    };

    return (
        <div className='h-screen'>
            <div className='grid lg:grid-cols-2'>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                        <div className=''>
                            <h3 className="font-semibold text-3xl mb-3 text-lime-400">
                                Login
                            </h3>
                            <h5 className="text-gray-500 font-light">
                                How do i get started?
                            </h5>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-10 space-y-5"
                        >
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-lime-400">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="rounded-full !ring-0 !ring-offset-lime-400"
                                        required
                                        {...register("email", { required: true })}
                                    />
                                </div>
                                {errors.email && <p className='text-red-400'>Email Address is required</p>}
                            </div>

                            <div className="">
                                <label
                                    htmlFor="password"
                                    className="text-sm/6 font-medium ring-0 text-lime-400"
                                >
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <Input
                                        type={visible ? 'text' : 'password'}
                                        placeholder="Enter password"
                                        className='rounded-full !ring-0 ring-offset-lime-400'
                                        required
                                        {...register("password", { required: true })}
                                    />
                                    <Button
                                        type='button'
                                        className='absolute right-2'
                                        variant={'link'}
                                        size={'icon'}
                                        onClick={() => setVisible(!visible)}
                                    >
                                        {visible ? <Eye /> : <EyeOff />}
                                    </Button>
                                </div>
                                {errors.password && <p className='text-red-400'>Password is required</p>}
                            </div>

                            <div className="flex flex-wrap items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 shrink-0 text-lime-400 focus:ring-lime-500 border-gray-300 rounded"
                                        {...register("remember")}
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500">
                                        Remember me
                                    </label>
                                </div>

                                <Link href="" className="text-sm text-lime-400 hover:underline font-semibold">
                                    Forgot password?
                                </Link>
                            </div>

                            <div className="">
                                <Button
                                    type='submit'
                                    className='w-full bg-gradient-to-r from-lime-950 to-lime-400 rounded-full'
                                    disabled={!(monitor.email && monitor.password)}
                                >
                                    {loading ? <Spinner text /> : "Login"}
                                </Button>
                            </div>
                        </form>
                    </div>

                </div>

                <div className='hidden lg:flex items-center justify-center py-2'>
                    <Image
                        src={forest}
                        className="rounded-lg"
                        alt="logo"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    )
}

export default Login


