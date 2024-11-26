import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Input } from '../ui/input'
import Image from 'next/image'

const Login = () => {
    return (
        <div className="h-full w-full flex flex-row">
            <main className="relative basis-full flex justify-center h-screen items-start sm:items-center min-[1020px]:basis-1/2 px-5 pt-20 pb-5">
                <div className="w-full max-w-md">

                    <div className='mb-6'>
                        <h3 className="font-semibold text-3xl mb-3 text-lime-400">
                            Login
                        </h3>
                        <h5 className="text-gray-500 font-light">
                            How do i get started?
                        </h5>
                    </div>

                    <form
                        className="w-full flex flex-col gap-4"
                    // onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="">
                            <label
                                htmlFor="email"
                                className="font-medium text-lime-400"
                            >
                                Email
                            </label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="rounded-full !ring-0 !ring-offset-0"
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="password"
                                className="font-medium text-lime-400"
                            >
                                Password
                            </label>
                            <div className="relative flex items-center">
                                <Input
                                    type='password'
                                    placeholder="Enter password"
                                    className='rounded-full'
                                    required
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500">
                                    Remember me
                                </label>
                            </div>

                            <Link href="" className="text-sm text-lime-400 hover:underline font-semibold">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="mt-4">
                            <Button className='w-full bg-gradient-to-r from-lime-950 to-lime-400 rounded-full'>
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
            <div className="min-[1020px]:flex box-border fixed w-[50vw] right-3 top-3 bottom-3 flex-col items-center justify-between hidden h-[97vh] rounded-2xl p-8 basis-1/2">
                <div className="flex flex-col items-start">
                    <Image
                        src={""}
                        className="h-16"
                        alt="logo"
                        width={100}
                        height={64}
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    )
}

export default Login


