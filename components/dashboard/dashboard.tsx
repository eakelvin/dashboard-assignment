"use client"
import { getReports } from '@/utils/api'
import { redirect, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const { replace } = useRouter()
    const [token, setToken] = useState<string | null>(null);
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
                const reports = await getReports(token)
                console.log(reports);
                setReport(reports)
            } catch (error: any) {
                console.log(error);
            }
        }

        refreshReports()
    }, [])

    return (
        <div>
            <h1 className='text-3xl mb-4'>Home Page</h1>
            Dashiinnining
            {/* <div>Your token is: {token}</div> */}
        </div>
    )
}

export default Dashboard
