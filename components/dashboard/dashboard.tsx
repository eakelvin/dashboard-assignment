"use client"
import { getReports } from '@/utils/api'
import { redirect } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const Dashboard = () => {
    const token = localStorage.getItem("token")
    const [report, setReport] = useState<Summary | null>(null)
    const [loading, setLoading] = useState(true)

    if (!token) {
        redirect("/login")
    }

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
            Dashiinnining
        </div>
    )
}

export default Dashboard
